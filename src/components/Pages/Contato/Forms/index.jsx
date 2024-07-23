/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import FormPartner from './Partner'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormWorkWithUs from './WorkWithUs'
import FormBudget from './Budget'
import FormOther from './Others'

export default function ContactForm({ categories }) {
  const [partnerType, setPartnerType] = useState('')
  const [responseMessage, setResponseMessage] = useState({
    success: '',
    error: '',
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

  const handlePartnerType = (value) => {
    setPartnerType(value)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    try {
      setSending(true)

      const responseSendEmail = await sendEmailToAction(formData)

      if (!responseSendEmail) throw new Error('Enviar email')

      if (formData.inputs.info.partnerType) {
        const responseInserDB = await insertDataIntoDB({
          formData,
        })
        if (!responseInserDB) throw new Error('Database')
      }

      toast.success('Email enviado com sucesso')
      // toast.success(responseMessage.success)
      setResetInputs(!resetInputs)
    } catch (error) {
      // toast.error(`${responseMessage.error} - ${error.message}`);
      toast.error(`Error ao enviar seu email, tente novamente mais tarde`)
    } finally {
      setSending(false)
    }
  }

  const sendEmailToAction = async (formData) => {
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
        <SectionTitle title={'Envie-nos um email'} />

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
              formData={formData}
              resetInputs={resetInputs}
              setResponseMessage={setResponseMessage}
            />
          )}
          {partnerType === 'budget' && (
            <FormBudget
              setFormData={setFormData}
              formData={formData}
              resetInputs={resetInputs}
              categories={categories}
              setResponseMessage={setResponseMessage}
            />
          )}

          {partnerType === 'others' && (
            <FormOther
              setFormData={setFormData}
              formData={formData}
              resetInputs={resetInputs}
              setResponseMessage={setResponseMessage}
            />
          )}
          {partnerType === 'parceiro' && (
            <FormPartner
              formData={formData}
              setFormData={setFormData}
              resetInputs={resetInputs}
              setResponseMessage={setResponseMessage}
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
