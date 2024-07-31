import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import SectionTitle from '@/components/SectionTitle'
import FormDistributor from './Distributor'
import FormAutoparts from './Autoparts'
import FormMechanics from './Mechanics'
import { toast } from 'react-toastify'
import TemplateMailPartner from '../../Contato/Forms/Partner/TemplateMail'
import TemplateMailSuccessRegister from './Components/TemplateMailSuccessRegister'
import { generateUniqueIdByCnpj, generateActionsLink } from '@/utils/functions'
import { EMAIL_RECIPIENTS, RESPONSE_MESSAGES } from '@/utils/constants'
import 'react-toastify/dist/ReactToastify.css'

export default function RegisterForm() {
  const [partnerType, setPartnerType] = useState('')
  const [resetInputs, setResetInputs] = useState(false)
  const [inputs, setInputs] = useState({})
  const [uniqueId, setUniqueId] = useState('')
  const [actionsLink, setActionsLink] = useState('')
  const [isSending, setIsSending] = useState(false)
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

  const handlePartnerType = (value) => setPartnerType(value)

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
      <TemplateMailSuccessRegister data={data} />,
    )

    data.structureMail = {
      html: structureHtml,
      to: data.inputs.info.email,
      cco: EMAIL_RECIPIENTS,
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
      cco: EMAIL_RECIPIENTS,
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

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    if (!formData.inputs.info.partnerType) return
    setIsSending(true)

    try {
      const isDataInserted = await insertDataIntoDB({ formData })
      if (isDataInserted && isDataInserted.message) {
        throw new Error(isDataInserted.message)
      }

      const isImagesUploaded = await uploadImagesToDB(formData)
      if (!isImagesUploaded) {
        throw new Error(RESPONSE_MESSAGES.error.uploadImages)
      }

      const isEmailPartnerSent = await sendEmailToPartner(formData)
      if (!isEmailPartnerSent) {
        throw new Error(RESPONSE_MESSAGES.error.emailPartner)
      }

      const isEmailAdminSent = await sendEmailToAction(formData)
      if (!isEmailAdminSent) throw new Error(RESPONSE_MESSAGES.error.emailAdmin)

      toast.success(RESPONSE_MESSAGES.success)
      setResetInputs(!resetInputs)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      className="m-auto my-4 mb-10 flex w-full max-w-7xl flex-col justify-between gap-10 px-6 md:my-7 md:px-14"
      id="register_"
    >
      <SectionTitle title="Cadastro" line />

      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className="flex flex-col items-center gap-10"
        encType="multipart/form-data"
      >
        <div className="flex w-full flex-col">
          <label className="text-lg font-bold capitalize" htmlFor="partnerType">
            Tipo de parceiro
          </label>
          <select
            id="partnerType"
            className="appearance-none border bg-custom-arrow bg-[calc(100%-1rem)_center] bg-no-repeat px-4 py-2"
            value={partnerType}
            onChange={(e) => handlePartnerType(e.target.value)}
          >
            <option value="" disabled>
              Área de Atuação
            </option>
            <option value="distribuidoras">Distribuidoras</option>
            <option value="mecanicas">Mecânicas</option>
            <option value="autopecas">Autopeças</option>
          </select>
        </div>

        {partnerType === 'distribuidoras' && (
          <FormDistributor
            setInputs={setInputs}
            resetInputs={resetInputs}
            partnerType={partnerType}
          />
        )}
        {partnerType === 'mecanicas' && (
          <FormMechanics
            setInputs={setInputs}
            resetInputs={resetInputs}
            partnerType={partnerType}
          />
        )}
        {partnerType === 'autopecas' && (
          <FormAutoparts
            setInputs={setInputs}
            resetInputs={resetInputs}
            partnerType={partnerType}
          />
        )}

        {partnerType && (
          <button
            type="submit"
            disabled={isSending}
            className="rounded-full bg-[#22326e] px-20 py-2 text-2xl text-white duration-500 hover:scale-110 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
        )}
      </form>
    </section>
  )
}
