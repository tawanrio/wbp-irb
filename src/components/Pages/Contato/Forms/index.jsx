/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import FormPartner from './Partner'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormWorkWithUs from './WorkWithUs'
import FormBudget from './Budget'
import { useIntl } from 'react-intl'
import FormOther from './Others'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'

export default function ContactForm({ categories, title }) {
  const [partnerType, setPartnerType] = useState('')
  const [formData, setFormData] = useState({
    inputs: {
      info: {},
      address: {},
    },
    actionsLink: {},
    html: '',
  })
  const [responseMessage, setResponseMessage] = useState({
    success: '',
    error: '',
  })

  const [resetInputs, setResetInputs] = useState(false)
  const [sending, setSending] = useState(null)

  const intl = useIntl()
  const messages = intl.messages

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

      toast.success(messages['notifications.email.success'])
      setResetInputs(!resetInputs)
    } catch (error) {
      toast.error(`${messages['notifications.email.error']} - ${error.message}`)
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
        {title && <SectionTitle title={title} />}

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
              className="border px-4 py-2"
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
                  {sending
                    ? messages['component.form.sending']
                    : messages['component.form.send']}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
