import { useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import { RESPONSE_MESSAGES } from '@/utils/constants'
import 'react-toastify/dist/ReactToastify.css'
import mechanic from '../../../../public/images/pages/autoparts/mechanic.png'
import Image from 'next/image'

export const FormHome = ({ inputs }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

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
        throw new Error(RESPONSE_MESSAGES.error.emailJob)
      }

      toast.success(RESPONSE_MESSAGES.success)
      resetForm()
    } catch (error) {
      toast.error(RESPONSE_MESSAGES.error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      id="contact_"
      className="relative mx-auto my-4 mb-10 flex w-full max-w-7xl flex-row items-end justify-end gap-12 px-6 md:my-7 md:px-14"
    >
      <Image
        src={mechanic}
        alt="Mecânico"
        width={564.73}
        height={849}
        className="absolute bottom-0 left-0 top-2 -z-10 hidden opacity-40 md:block lg:opacity-100"
      />
      <section className="flex flex-col items-center gap-12">
        <div className="flex w-full max-w-[505.91px] flex-col items-end">
          <h2 className="bg-[linear-gradient(90deg,#982225_0%,#22326E_100%)] bg-clip-text text-end text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            Entre em contato
          </h2>
          <h3 className="bg-[linear-gradient(90deg,#982225_0%,#22326E_100%)] bg-clip-text text-end text-4xl font-bold !leading-[1.2] text-transparent sm:text-5xl md:text-6xl">
            com a gente :{')'}
          </h3>
        </div>
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex w-full max-w-[505.91px] flex-col items-end gap-10"
        >
          <div className="flex w-full flex-col gap-6">
            {inputs?.name && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="nome"
                  className="text-lg font-black capitalize text-[#22326E]"
                >
                  Seu Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  className="rounded-full border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            {inputs?.email && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-lg font-black text-[#22326E]"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="rounded-full border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {inputs?.phone && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-lg font-black text-[#22326E]"
                >
                  Telefone ou WhatsApp
                </label>
                <InputMask
                  id="phone"
                  mask="(99) 99999-9999"
                  ref={phoneRef}
                  required
                  className="rounded-full border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}
            {inputs?.message && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="message"
                  className="text-lg font-black text-[#22326E]"
                >
                  Deixe sua Mensagem :{')'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  cols="50"
                  rows="5"
                  className="h-[165.36px] w-full resize-none rounded-2xl border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            )}
          </div>
          <button
            disabled={isSending}
            type="submit"
            className="rounded-full bg-[#982225] px-10 py-2 text-lg uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </section>
    </section>
  )
}
