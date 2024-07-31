import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import SectionTitle from '@/components/SectionTitle'
import FormPartner from './Partner'
import { toast } from 'react-toastify'
import FormWorkWithUs from './WorkWithUs'
import FormBudget from './Budget'
import { useIntl } from 'react-intl'
import FormOther from './Others'
import { RESPONSE_MESSAGE } from '@/utils/constants'
import TemplateMailPartner from './Partner/TemplateMail'
import { generateActionsLink, generateUniqueIdByCnpj } from '@/utils/functions'
import TemplateMailOthers from './Others/TemplateMail'
import TemplateMailBudget from './Budget/TemplateMail'
import TemplateMailWorkWithUs from './WorkWithUs/TemplateMail'
import TemplateMailSuccessRegister from '../../Register/Forms/Components/TemplateMailSuccessRegister'
import 'react-toastify/dist/ReactToastify.css'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'

export default function ContactForm({ categories, title }) {
  const [partnerType, setPartnerType] = useState('')
  const [uniqueId, setUniqueId] = useState('')
  const [actionsLink, setActionsLink] = useState('')
  const [resetInputs, setResetInputs] = useState(false)
  const [inputs, setInputs] = useState(null)
  const [sending, setSending] = useState(false)
  const [formData, setFormData] = useState({
    inputs: {
      info: {},
      address: {},
      requirements: {},
    },
    actionsLink: {},
    html: '',
  })
  const intl = useIntl()
  const messages = intl.messages

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

  const uploadCurriculumToDB = async (data) => {
    const { cnpj, curriculum } = data.inputs.info || {}

    if (curriculum) {
      const responseCurriculum = await insertImgDatabase(curriculum, cnpj)
      data.inputs.info.curriculum = responseCurriculum?.path
        ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseCurriculum.path}`
        : ''

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

  const sendEmail = async (data, template, subject, to) => {
    const structureHtml = ReactDOMServer.renderToString(template)

    data.structureMail = {
      html: structureHtml,
      to,
      cco: ['tawan.rio@webfoco.com', 'rodrigojsdeveloper@gmail.com'],
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
    setSending(true)

    try {
      let emailSent = false
      if (partnerType === 'budget') {
        emailSent = await sendEmail(
          formData,
          <TemplateMailBudget data={formData} />,
          messages['component.contact.budget'],
          process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
        )
      } else if (partnerType === 'parceiro') {
        await handlePartnerFormSubmission()
        emailSent = true
      } else if (partnerType === 'work-with-us') {
        await handleWorkWithUsFormSubmission()
        emailSent = true
      } else if (partnerType === 'others') {
        emailSent = await sendEmail(
          formData,
          <TemplateMailOthers data={formData} />,
          messages['component.contact'],
          process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
        )
      }

      if (emailSent) {
        toast.success(RESPONSE_MESSAGE.success)
        setResetInputs(!resetInputs)
      } else {
        throw new Error(RESPONSE_MESSAGE.error.emailAdmin)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSending(false)
    }
  }

  const handlePartnerFormSubmission = async () => {
    if (!formData.inputs.info.partnerType) return

    const isDataInserted = await insertDataIntoDB({ formData })
    if (isDataInserted && isDataInserted.message) {
      throw new Error(isDataInserted.message)
    }

    const isImagesUploaded = await uploadImagesToDB(formData)
    if (!isImagesUploaded) {
      throw new Error(RESPONSE_MESSAGE.error.uploadImages)
    }

    const isEmailAdminSent = await sendEmail(
      formData,
      <TemplateMailPartner
        data={formData}
        uniqueId={uniqueId}
        actionsLink={actionsLink}
      />,
      messages['component.contact.partner.register'],
      process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
    )
    if (!isEmailAdminSent) {
      throw new Error(RESPONSE_MESSAGE.error.emailAdmin)
    }

    const isEmailPartnerSent = await sendEmail(
      formData,
      <TemplateMailSuccessRegister data={formData.inputs} />,
      messages['notifications.register.success'],
      formData.inputs.info.email,
    )
    if (!isEmailPartnerSent) {
      throw new Error(RESPONSE_MESSAGE.error.emailPartner)
    }
  }

  const handleWorkWithUsFormSubmission = async () => {
    const isImagesUploaded = await uploadCurriculumToDB(formData)
    if (!isImagesUploaded) {
      throw new Error(RESPONSE_MESSAGE.error.uploadImages)
    }

    const isEmailWorkWithUs = await sendEmail(
      formData,
      <TemplateMailWorkWithUs data={formData} />,
      messages['component.contact.select.workWithUs'],
      process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
    )
    if (!isEmailWorkWithUs) {
      throw new Error(RESPONSE_MESSAGE.error.emailJob)
    }
  }

  return (
    <section
      className="mx-auto my-4 mb-10 flex w-full max-w-7xl flex-col justify-between gap-10 px-6 md:my-7 md:px-14"
      id="register_"
    >
      <SectionTitle title={title} />

      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex w-full flex-col">
          <label className="text-lg font-bold" htmlFor="partnerType">
            <InsertTranslationMsg keyTrans={'component.contact.reason'} />
          </label>
          <select
            id="partnerType"
            className="appearance-none border bg-custom-arrow bg-[calc(100%-1rem)_center] bg-no-repeat px-4 py-2"
            value={partnerType}
            onChange={(e) => handlePartnerType(e.target.value)}
          >
            <InsertTranslationMsg
              keyTrans={'component.contact.select'}
              tag="option"
              value=""
            />
            <InsertTranslationMsg
              keyTrans={'component.contact.select.budget'}
              tag="option"
              value="budget"
            />
            <InsertTranslationMsg
              keyTrans={'component.contact.select.partner'}
              tag="option"
              value="parceiro"
            />
            <InsertTranslationMsg
              keyTrans={'component.contact.select.workWithUs'}
              tag="option"
              value="work-with-us"
            />

            <InsertTranslationMsg
              keyTrans={'component.contact.select.others'}
              tag="option"
              value="others"
            />
          </select>
        </div>

        {partnerType === 'budget' && (
          <FormBudget
            setFormData={setFormData}
            resetInputs={resetInputs}
            categories={categories}
          />
        )}
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
          <button className="rounded-full bg-[#22326e] px-20 py-2 text-2xl text-white duration-500 hover:scale-110">
            {sending
              ? messages['component.form.sending']
              : messages['component.form.send']}
          </button>
        )}
      </form>
    </section>
  )
}
