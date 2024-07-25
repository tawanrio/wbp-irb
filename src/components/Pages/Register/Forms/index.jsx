/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import FormDistributor from './Distributor'
import FormAutoparts from './Autoparts'
import FormMechanics from './Mechanics'
import { toast } from 'react-toastify'
import ReactDOMServer from 'react-dom/server'
import TemplateMailPartner from '../../Contato/Forms/Partner/TemplateMail'
import TemplateMailSuccessRegister from './Components/TemplateMailSuccessRegister'
import { generateUniqueIdByCnpj, generateActionsLink } from '@/utils/functions'
import 'react-toastify/dist/ReactToastify.css'

export default function RegisterForm() {
  const [partnerType, setPartnerType] = useState('')
  const [inputs, setInputs] = useState(null)
  const [uniqueId, setUniqueId] = useState('')
  const [structureMail, setStructureMail] = useState({})
  const [html, setHtml] = useState('')
  const [actionsLink, setActionsLink] = useState('')

  const [responseMessage] = useState({
    success: 'Cadastro enviado com sucesso, aguarde aprovação.',
    error: 'Erro ao enviar cadastro.',
  })

  const [formData, setFormData] = useState({
    inputs: {
      info: {},
      address: {},
    },
    actionsLink: {},
    html: '',
  })

  const [resetInputs, setResetInputs] = useState(false)
  const [sending, setSending] = useState(null)

  const handlePartnerType = (value) => setPartnerType(value)

  useEffect(() => {
    if (formData.inputs?.info.cnpj) {
      setUniqueId(generateUniqueIdByCnpj(formData.inputs?.info?.cnpj))
      setActionsLink(generateActionsLink(formData.inputs?.info?.cnpj, uniqueId))
    }

    if (formData.inputs?.info.cnpj && formData.inputs?.info.logo) {
      uploadImagesToDB(formData)
    }

    const generatedHtml = ReactDOMServer.renderToString(
      <TemplateMailPartner
        data={formData}
        uniqueId={uniqueId}
        actionsLink={actionsLink}
      />,
    )

    setHtml(generatedHtml)

    setStructureMail({
      html,
      to: process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
      // to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'formData.inputs.info.tradingName',
      subject: 'Solicitação de cadastro de parceiro',
    })

    setFormData({
      inputs,
      structureMail,
      uniqueId,
    })
  }, [inputs])

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    if (!formData.inputs.info.partnerType) return
    setSending(true)

    try {
      const responseUploadImages = await uploadImagesToDB(formData)
      if (!responseUploadImages) throw new Error('Upload Images')

      const responseInserDB = await insertDataIntoDB({
        formData,
      })

      if (!responseInserDB) throw new Error('Database')

      const responseSendEmailAdm = await sendEmailToAction(formData)
      if (!responseSendEmailAdm) throw new Error('Envio de email')

      const responseSendEmailPartner = await sendEmailToPartner(formData)
      if (!responseSendEmailPartner) throw new Error('Envio de email')

      toast.success(responseMessage.success)

      // setResetInputs(!(resetInputs))
    } catch (error) {
      toast.error(`${responseMessage.error} - ${error.message}`)
    } finally {
      setSending(false)
    }
  }

  const uploadImagesToDB = async (data) => {
    if (data.inputs.info.logo instanceof File) {
      const responseLogo = await insertImgDatabase(
        data.inputs.info.logo,
        data.inputs.info.cnpj,
      )

      if (!responseLogo || responseLogo.status !== 200)
        throw new Error('Database')

      data.inputs.info.logo = `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseLogo.path}`
    }

    if (
      data.inputs.requirements.certificateImg instanceof File ||
      data.inputs.requirements.elevatorImg instanceof File
    ) {
      const { certificateImg, elevatorImg } = data.inputs.requirements
      const { cnpj } = data.inputs.info

      const responseCertificate = certificateImg
        ? await insertImgDatabase(certificateImg, cnpj)
        : ''
      const responseElevatorImg = elevatorImg
        ? await insertImgDatabase(elevatorImg, cnpj)
        : ''

      data.inputs.requirements.certificateImg = responseCertificate?.path
        ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseCertificate.path}`
        : ''
      data.inputs.requirements.elevatorImg = responseElevatorImg?.path
        ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseElevatorImg.path}`
        : ''
    }

    setFormData({
      ...data,
    })

    return true
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

    const result = await response.json()
    return result
  }

  const sendEmailToAction = async (data) => {
    // const response = await fetch('http://localhost:3000/api/handlemail/sendmail', {
    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/sendmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
        }),
      },
    )
    return response.ok
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
    return response.ok
  }

  return (
    <section className="flex flex-col items-center" id={`register_`}>
      <div className="my-4 mb-10 flex w-full max-w-7xl flex-col justify-between gap-10 px-6 md:my-7 md:px-14">
        <SectionTitle title={'Cadastro'} line />

        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex flex-col items-center gap-10"
          enctype=" multipart/form-data "
        >
          <div className="flex w-full flex-col">
            <label
              className="text-lg font-bold capitalize"
              htmlFor="partnerType"
            >
              Tipo de parceiro
            </label>
            <select
              id="partnerType"
              className="border px-4 py-2"
              value={partnerType}
              onChange={(e) => handlePartnerType(e.target.value)}
            >
              <option value="">Área de Atuação</option>
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

          {!(partnerType === '') && (
            <>
              <div>
                <button
                  // disabled={sending}
                  className="rounded-full bg-[#22326e] px-20 py-2 text-2xl text-white duration-500 hover:scale-110"
                >
                  {sending ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
