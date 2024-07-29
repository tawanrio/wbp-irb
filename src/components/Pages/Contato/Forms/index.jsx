import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import SectionTitle from '@/components/SectionTitle'
import FormPartner from './Partner'
import { toast } from 'react-toastify'
import FormWorkWithUs from './WorkWithUs'
import FormBudget from './Budget'
import FormOther from './Others'
import { RESPONSE_MESSAGE } from '@/utils/constants'
import TemplateMailSuccessRegister from '../../Register/Forms/Components/TemplateMailSuccessRegister'
import TemplateMailPartner from './Partner/TemplateMail'
import { generateActionsLink, generateUniqueIdByCnpj } from '@/utils/functions'
import TemplateMailOthers from './Others/TemplateMail'
import TemplateMailBudget from './Budget/TemplateMail'
import 'react-toastify/dist/ReactToastify.css'

export default function ContactForm({ categories }) {
  const [partnerType, setPartnerType] = useState('')
  const [uniqueId, setUniqueId] = useState('')
  const [actionsLink, setActionsLink] = useState('')
  const [resetInputs, setResetInputs] = useState(false)
  const [inputs, setInputs] = useState(null)
  const [sending, setSending] = useState(null)
  const [formData, setFormData] = useState({
    inputs: {
      info: {},
      address: {},
      requirements: {},
    },
    actionsLink: {},
    html: '',
  })

  useEffect(() => {
    if (inputs?.info?.cnpj) {
      const newUniqueId = generateUniqueIdByCnpj(inputs.info.cnpj)
      setUniqueId(newUniqueId)
      setActionsLink(generateActionsLink(inputs.info.cnpj, newUniqueId))
    }
  }, [inputs])

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      inputs,
      uniqueId,
    }))
  }, [inputs, uniqueId, actionsLink])

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      requirements: {
        ...prevInputs?.requirements,
        selectedEquipments: formData.inputs?.requirements?.selectedEquipments,
      },
    }))
  }, [formData.inputs?.requirements?.selectedEquipments])

  const handlePartnerType = (value) => {
    setPartnerType(value)
  }

  const uploadImagesToDB = async (data) => {
    const { certificateImg, elevatorImg } = data.inputs?.requirements || {}
    const { cnpj, logo } = data.inputs.info

    if (logo && cnpj) {
      const responseLogo = await insertImgDatabase(logo, cnpj)
      if (!responseLogo || responseLogo.status !== 200) {
        throw new Error('Database')
      }
      data.inputs.info.logo = `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseLogo.path}`

      if (certificateImg && elevatorImg) {
        const responseCertificate = await insertImgDatabase(
          certificateImg,
          cnpj,
        )
        data.inputs.requirements.certificateImg = responseCertificate?.path
          ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseCertificate.path}`
          : ''

        const responseElevatorImg = await insertImgDatabase(elevatorImg, cnpj)
        data.inputs.requirements.elevatorImg = responseElevatorImg?.path
          ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseElevatorImg.path}`
          : ''
      }

      setFormData((prevData) => ({
        ...prevData,
        ...data,
      }))

      return true
    }

    return false
  }

  const insertImgDatabase = async (img, cnpj) => {
    const data = new FormData()
    data.append('file', img)
    data.append('origin', 'register')
    data.append('id', cnpj)

    const response = await fetch(
      process.env.NEXT_PUBLIC_UPLOAD_IMAGES + '/communication/files/upload',
      {
        method: 'POST',
        body: data,
      },
    )

    return response.json()
  }

  const insertDataIntoDB = async (data) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/insertdb',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    if (response.ok) {
      return response.ok
    } else {
      const responseData = await response.json()
      return responseData
    }
  }

  const sendEmailToPartner = async (data) => {
    const structureHtml = ReactDOMServer.renderToString(
      <TemplateMailSuccessRegister data={data.inputs} />,
    )

    data.structureMail = {
      html: structureHtml,
      to: data.inputs.info.email,
      cco: 'tawan.rio@webfoco.com',
      from: 'formData.inputs.info.tradingName',
      subject: 'Cadastro Recebido: Aguardando Aprovação',
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/sendmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data,
        }),
      },
    )
    return response.ok
  }

  const sendEmailToAction = async (data) => {
    const structureHtml = ReactDOMServer.renderToString(
      <TemplateMailPartner
        data={data}
        uniqueId={uniqueId}
        actionsLink={actionsLink}
      />,
    )

    data.structureMail = {
      html: structureHtml,
      to: process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
      cco: 'tawan.rio@webfoco.com',
      from: 'formData.inputs.info.tradingName',
      subject: 'Solicitação de cadastro de parceiro',
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/sendmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data,
        }),
      },
    )
    return response.ok
  }

  const sendEmailToActionOthers = async (data) => {
    const structureHtml = ReactDOMServer.renderToString(
      <TemplateMailOthers data={data} />,
    )

    data.structureMail = {
      html: structureHtml,
      to: process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
      // to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'Contato IRB',
      subject: 'Contato IRB',
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/sendmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data,
        }),
      },
    )
    return response.ok
  }

  const sendEmailToActionBudget = async (data) => {
    const structureHtml = ReactDOMServer.renderToString(
      <TemplateMailBudget data={data} />,
    )

    data.structureMail = {
      html: structureHtml,
      to: process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
      // to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'Orçamento IRB',
      subject: 'Pedido de orçamento',
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/sendmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data,
        }),
      },
    )
    return response.ok
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setSending(true)

    if (partnerType === 'parceiro') {
      if (!formData.inputs.info.partnerType) return

      try {
        const isDataInserted = await insertDataIntoDB({ formData })
        if (isDataInserted && isDataInserted.message) {
          throw new Error(isDataInserted.message)
        }

        const isImagesUploaded = await uploadImagesToDB(formData)
        if (!isImagesUploaded) {
          throw new Error(RESPONSE_MESSAGE.error.uploadImages)
        }

        const isEmailPartnerSent = await sendEmailToPartner(formData)
        if (!isEmailPartnerSent) {
          throw new Error(RESPONSE_MESSAGE.error.emailPartner)
        }

        const isEmailAdminSent = await sendEmailToAction(formData)
        if (!isEmailAdminSent)
          throw new Error(RESPONSE_MESSAGE.error.emailAdmin)

        toast.success(RESPONSE_MESSAGE.success)
        setResetInputs(!resetInputs)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setSending(false)
      }
    }

    if (partnerType === 'work-with-us') {
      try {
        const isEmailAdminSent = await sendEmailToAction(formData)
        if (!isEmailAdminSent)
          throw new Error(RESPONSE_MESSAGE.error.emailAdmin)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setSending(false)
      }
    }

    if (partnerType === 'others') {
      try {
        const isEmailAdminSent = await sendEmailToActionOthers(formData)
        if (!isEmailAdminSent)
          throw new Error(RESPONSE_MESSAGE.error.emailAdmin)

        toast.success(RESPONSE_MESSAGE.success)
        setResetInputs(!resetInputs)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setSending(false)
      }
    }

    if (partnerType === 'budget') {
      try {
        const isEmailAdminSent = await sendEmailToActionBudget(formData)
        if (!isEmailAdminSent)
          throw new Error(RESPONSE_MESSAGE.error.emailAdmin)

        toast.success(RESPONSE_MESSAGE.success)
        setResetInputs(!resetInputs)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setSending(false)
      }
    }
  }

  return (
    <section className="flex flex-col items-center" id="register_">
      <div className="my-4 mb-10 flex w-full max-w-7xl flex-col justify-between gap-10 px-6 md:my-7 md:px-14">
        <SectionTitle title="Envie-nos um email" />

        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex flex-col items-center gap-10"
        >
          <div className="flex w-full flex-col">
            <label className="text-lg font-bold" htmlFor="partnerType">
              Motivo do contato
            </label>
            <select
              id="partnerType"
              className="border px-4 py-2"
              value={partnerType}
              onChange={(e) => handlePartnerType(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="budget">Realizar um orçamento</option>
              <option value="parceiro">Virar um parceiro IRB</option>
              <option value="work-with-us">Trabalhar na IRB</option>
              <option value="others">Outros</option>
            </select>
          </div>

          {partnerType === 'work-with-us' && (
            <FormWorkWithUs
              setFormData={setFormData}
              resetInputs={resetInputs}
            />
          )}
          {partnerType === 'budget' && (
            <FormBudget
              setFormData={setFormData}
              resetInputs={resetInputs}
              categories={categories}
            />
          )}

          {partnerType === 'others' && (
            <FormOther setFormData={setFormData} resetInputs={resetInputs} />
          )}
          {partnerType === 'parceiro' && (
            <FormPartner resetInputs={resetInputs} setInputs={setInputs} />
          )}

          {partnerType && (
            <button className="rounded-full bg-[#22326e] px-20 py-2 text-2xl text-white duration-500 hover:scale-110">
              {sending ? 'Enviando...' : 'Enviar'}
            </button>
          )}
        </form>
      </div>
    </section>
  )
}
