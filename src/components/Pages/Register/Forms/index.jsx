import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import FormDistributor from './Distributor'
import FormAutoparts from './Autoparts'
import FormMechanics from './Mechanics'
import { toast } from 'react-toastify'
import TemplateMailPartner from '../../Contato/Forms/Partner/TemplateMail'
import TemplateMailSuccessRegister from './Components/TemplateMailSuccessRegister'
import { generateUniqueIdByCnpj, generateActionsLink } from '@/utils/functions'
import { EMAIL_RECIPIENTS, RESPONSE_MESSAGES } from '@/utils/constants'
import { cn } from '@/lib/utils'
import 'react-toastify/dist/ReactToastify.css'

export default function RegisterForm() {
  const [partnerType, setPartnerType] = useState('distribuidoras')
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

      try {
        await uploadImagesToDB(formData)
      } catch (error) {
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

  const handleButtonClick = (type) => {
    setPartnerType(type)
  }

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

  return (
    <section
      id="register_"
      className="m-auto flex w-full max-w-6xl flex-col justify-between gap-8 px-5 pb-14 pt-14 sm:gap-12 sm:pt-20"
    >
      <h1 className="max-w-md font-['Libre_Baskerville'] text-4xl text-white sm:text-5xl lg:text-6xl">
        <i>Torne-se </i>
        <br />
        um <i>parceiro</i> IRB
      </h1>
      <div className="mx-auto flex max-w-6xl flex-row flex-wrap justify-center gap-4">
        <button
          onClick={() => handleButtonClick('autopecas')}
          className={cn(
            'rounded-full px-6 py-1 text-lg font-light uppercase duration-500 hover:scale-95',
            partnerType === 'autopecas'
              ? 'bg-white text-black'
              : 'bg-[#FFFFFF42] text-white',
          )}
        >
          Autopeças
        </button>
        <button
          onClick={() => handleButtonClick('distribuidoras')}
          className={cn(
            'rounded-full bg-[#FFFFFF42] px-6 py-1 text-lg font-light uppercase text-white duration-500 hover:scale-95',
            partnerType === 'distribuidoras'
              ? 'bg-white text-black'
              : 'bg-[#FFFFFF42] text-white',
          )}
        >
          Distribuidoras
        </button>
        <button
          onClick={() => handleButtonClick('mecanicas')}
          className={cn(
            'rounded-full bg-[#FFFFFF42] px-6 py-1 text-lg font-light uppercase text-white duration-500 hover:scale-95',
            partnerType === 'mecanicas'
              ? 'bg-white text-black'
              : 'bg-[#FFFFFF42] text-white',
          )}
        >
          Mecânicas
        </button>
      </div>
      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className="flex flex-col items-end gap-10"
        encType="multipart/form-data"
      >
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
            className="rounded-full bg-[#982225] px-6 py-1 font-light uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)] duration-500 hover:scale-95 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
        )}
      </form>
    </section>
  )
}
