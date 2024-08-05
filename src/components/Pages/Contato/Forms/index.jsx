import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import SectionTitle from '@/components/SectionTitle'
import FormPartner from './Partner'
import { toast } from 'react-toastify'
import FormWorkWithUs from './WorkWithUs'
import FormOther from './Others'
import { EMAIL_RECIPIENTS, RESPONSE_MESSAGES } from '@/utils/constants'
import TemplateMailPartner from './Partner/TemplateMail'
import { generateActionsLink, generateUniqueIdByCnpj } from '@/utils/functions'
import TemplateMailOthers from './Others/TemplateMail'
import TemplateMailWorkWithUs from './WorkWithUs/TemplateMail'
import TemplateMailSuccessRegister from '../../Register/Forms/Components/TemplateMailSuccessRegister'
import 'react-toastify/dist/ReactToastify.css'

export default function ContactForm() {
  const [partnerType, setPartnerType] = useState('')
  const [uniqueId, setUniqueId] = useState('')
  const [actionsLink, setActionsLink] = useState('')
  const [resetInputs, setResetInputs] = useState(false)
  const [inputs, setInputs] = useState(null)
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

  const handlePartnerType = (value) => {
    setPartnerType(value)
  }

  const uploadImagesToDB = async (data) => {
    const { certificateImg, elevatorImg } = data.inputs?.requirements || {}
    const { cnpj, logo } = data.inputs.info

    if (!logo || !cnpj) {
      throw new Error('Logo ou CNPJ estão faltando')
    }

    const responseLogo = await insertImgDatabase(logo, cnpj)
    if (!responseLogo || responseLogo.status !== 200) {
      throw new Error('Falha ao fazer upload do logo para o banco de dados')
    }
    data.inputs.info.logo = `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseLogo.path}`

    if (certificateImg && elevatorImg) {
      const responseCertificate = await insertImgDatabase(certificateImg, cnpj)
      if (responseCertificate?.path) {
        data.inputs.requirements.certificateImg = `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseCertificate.path}`
      } else {
        data.inputs.requirements.certificateImg = ''
      }

      const responseElevatorImg = await insertImgDatabase(elevatorImg, cnpj)
      if (responseElevatorImg?.path) {
        data.inputs.requirements.elevatorImg = `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseElevatorImg.path}`
      } else {
        data.inputs.requirements.elevatorImg = ''
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  const uploadCurriculumToDB = async (data) => {
    const { cnpj, curriculum } = data.inputs.info || {}

    if (!curriculum) {
      throw new Error('Currículo está faltando')
    }

    const responseCurriculum = await insertImgDatabase(curriculum, cnpj)
    if (!responseCurriculum || responseCurriculum.status !== 200) {
      throw new Error(
        'Falha ao fazer upload do currículo para o banco de dados',
      )
    }

    data.inputs.info.curriculum = responseCurriculum?.path
      ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseCurriculum.path}`
      : ''

    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }))
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

  const sendEmail = async (data, template, subject, to) => {
    const structureHtml = ReactDOMServer.renderToString(template)

    data.structureMail = {
      html: structureHtml,
      to,
      cco: EMAIL_RECIPIENTS,
      from: data.inputs.info.tradingName,
      subject,
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/handlemail/sendmail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: data }),
      },
    )

    return response.ok
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsSending(true)

    try {
      let emailSent = false
      if (partnerType === 'parceiro') {
        await handlePartnerFormSubmission()
        emailSent = true
      } else if (partnerType === 'work-with-us') {
        await handleWorkWithUsFormSubmission()
        emailSent = true
      } else if (partnerType === 'others') {
        emailSent = await sendEmail(
          formData,
          <TemplateMailOthers data={formData} />,
          'Contato IRB',
          process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
        )
      }

      if (emailSent) {
        toast.success(RESPONSE_MESSAGES.success)
        setResetInputs(!resetInputs)
      } else {
        throw new Error(RESPONSE_MESSAGES.error.emailAdmin)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSending(false)
    }
  }

  const handlePartnerFormSubmission = async () => {
    if (!formData.inputs.info.partnerType) return

    const isDataInserted = await insertDataIntoDB({ formData })
    if (isDataInserted && isDataInserted.message) {
      throw new Error(isDataInserted.message)
    }

    try {
      await uploadImagesToDB(formData)
    } catch (error) {
      throw new Error(RESPONSE_MESSAGES.error.uploadImages)
    }

    const isEmailAdminSent = await sendEmail(
      formData,
      <TemplateMailPartner
        data={formData}
        uniqueId={uniqueId}
        actionsLink={actionsLink}
      />,
      'Solicitação de cadastro de parceiro',
      process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
    )
    if (!isEmailAdminSent) {
      throw new Error(RESPONSE_MESSAGES.error.emailAdmin)
    }

    const isEmailPartnerSent = await sendEmail(
      formData,
      <TemplateMailSuccessRegister data={formData} />,
      'Cadastro Recebido: Aguardando Aprovação',
      formData.inputs.info.email,
    )
    if (!isEmailPartnerSent) {
      throw new Error(RESPONSE_MESSAGES.error.emailPartner)
    }
  }

  const handleWorkWithUsFormSubmission = async () => {
    try {
      await uploadCurriculumToDB(formData)
    } catch (error) {
      throw new Error(RESPONSE_MESSAGES.error.uploadImages)
    }

    const isEmailWorkWithUs = await sendEmail(
      formData,
      <TemplateMailWorkWithUs data={formData} />,
      'Trabalhar na IRB',
      process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
    )
    if (!isEmailWorkWithUs) {
      throw new Error(RESPONSE_MESSAGES.error.emailJob)
    }
  }

  return (
    <section
      className="mx-auto my-4 mb-10 flex w-full max-w-7xl flex-col justify-between gap-10 px-6 md:my-7 md:px-14"
      id="register_"
    >
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
            className="appearance-none border bg-custom-arrow bg-[calc(100%-1rem)_center] bg-no-repeat px-4 py-2"
            value={partnerType}
            onChange={(e) => handlePartnerType(e.target.value)}
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="parceiro">Virar um parceiro IRB</option>
            <option value="work-with-us">Trabalhar na IRB</option>
            <option value="others">Outros</option>
          </select>
        </div>

        {partnerType === 'parceiro' && (
          <FormPartner resetInputs={resetInputs} setInputs={setInputs} />
        )}
        {partnerType === 'work-with-us' && (
          <FormWorkWithUs setFormData={setFormData} resetInputs={resetInputs} />
        )}
        {partnerType === 'others' && (
          <FormOther setFormData={setFormData} resetInputs={resetInputs} />
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
