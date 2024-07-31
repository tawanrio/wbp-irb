import { useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import SectionTitle from '../SectionTitle'
import { toast } from 'react-toastify'
import { RESPONSE_MESSAGE } from '@/utils/constants'
import 'react-toastify/dist/ReactToastify.css'
import { useIntl } from 'react-intl'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'

export default function Form({ inputs, colors, title }) {
  const colorText = '#666'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const intl = useIntl()
  const messages = intl.messages

  const phoneRef = useRef(null)

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setSubject('')
    setMessage('')
  }

  const sendMessage = async (data) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/forms',
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

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsSending(true)

    try {
      const messageContact = await sendMessage({
        name,
        email,
        tel: phone,
        subject: subject || 'Novo Contato',
        message,
      })
      if (!messageContact) {
        throw new Error(RESPONSE_MESSAGE.error.emailJob)
      }

      toast.success(RESPONSE_MESSAGE.success)
      resetForm()
    } catch (error) {
      toast.error(RESPONSE_MESSAGE.error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      className="mx-auto my-4 mb-10 flex w-full max-w-7xl flex-col items-center justify-between gap-10 px-6 md:my-7 md:px-14"
      id="contact_"
    >
      <SectionTitle title={title} line className="w-full" />
      <form
        onSubmit={(e) => handleSubmitForm(e)}
        className="flex flex-col items-center gap-10"
      >
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div className="mb-2 flex flex-col gap-2">
            {inputs?.name && (
              <div className="flex flex-col">
                <label
                  className="text-lg font-bold capitalize"
                  htmlFor="fullName"
                  style={{ color: colorText }}
                >
                   <InsertTranslationMsg
                      keyTrans={'component.form.input.name'}
                    />
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder={
                    messages['component.form.input.name.placeholder']
                  }
                  className="border px-4 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            {inputs?.email && (
              <div className="flex flex-col">
                <label
                  className="text-lg font-bold capitalize"
                  htmlFor="email"
                  style={{ color: colorText }}
                >
                  <InsertTranslationMsg
                      keyTrans={'component.form.input.email'}
                    />
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder={
                    messages['component.form.input.email.placeholder']
                  }
                  className="border px-4 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {inputs?.phone && (
              <div className="flex flex-col">
                <label
                  className="text-lg font-bold capitalize"
                  htmlFor="phone"
                  style={{ color: colorText }}
                >
                    <InsertTranslationMsg
                      keyTrans={'component.form.input.phone'}
                    />
                </label>
                <InputMask
                  id="phone"
                  mask="(99) 99999-9999"
                  ref={phoneRef}
                  required
                  placeholder={
                    messages['component.form.input.phone.placeholder']
                  }
                  className="border px-4 py-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}
            {inputs?.subject && (
              <div className="flex flex-col">
                <label
                  className="text-lg font-bold capitalize"
                  htmlFor="subject"
                  style={{ color: colorText }}
                >
                  <InsertTranslationMsg
                      keyTrans={'component.form.input.subject'}
                    />
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder={
                    messages['component.form.input.subject.placeholder']
                  }
                  className="border px-4 py-2"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            )}
          </div>
          {inputs?.message && (
            <div className="flex w-full flex-col">
              <label
                className="text-lg font-bold capitalize"
                htmlFor="message"
                style={{ color: colorText }}
              >
                <InsertTranslationMsg
                      keyTrans={'component.form.input.message'}
                    />
              </label>
              <textarea
                id="message"
                name="message"
                required
                cols="50"
                rows="5"
                placeholder={
                  messages['component.form.input.message.placeholder']
                }
                className="h-[12.375rem] w-full resize-none border px-4 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          disabled={isSending}
          style={{
            backgroundColor: colors?.button.bg,
            color: colors?.button.text,
          }}
          type="submit"
          className="rounded-full px-20 py-2 text-2xl text-white duration-500 hover:scale-110"
        >
          {isSending
            ? messages['component.form.sending']
            : messages['component.form.send']}
        </button>
      </form>
    </section>
  )
}
