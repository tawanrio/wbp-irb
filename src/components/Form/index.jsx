/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import SectionTitle from '../SectionTitle'

export default function Form({ inputs, colors }) {
  const colorText = '#666'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setSubject('')
    setMessage('')
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    try {
      setIsSending(true)
      setSuccessMessage('')
      setErrorMessage('')

      const response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/forms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            tel: phone,
            subject: subject || 'Novo Contato',
            message,
          }),
        },
      )

      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setSuccessMessage('Email enviado com sucesso!')
        resetForm()
      } else {
        // console.error('Erro ao enviar formulário:', response.statusText);
        setErrorMessage('Falha ao enviar email.')
      }
    } catch (error) {
      // console.error('Erro ao enviar formulário:', error.message);
      setErrorMessage('Falha ao enviar email.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="flex flex-col items-center" id={`contact_`}>
      <div className="my-4 mb-10 flex w-full max-w-7xl flex-col justify-between gap-10 px-6 md:my-7 md:px-14">
        <SectionTitle title={'Contato'} line />
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex flex-col items-center gap-10"
        >
          <div className="flex w-full justify-between gap-4 md:my-0 md:gap-10 md:px-0">
            <div className="flex w-1/2 flex-col gap-4">
              {inputs?.name && (
                <div className="flex flex-col">
                  <label
                    className="text-lg font-bold capitalize"
                    htmlFor="nome"
                    style={{ color: colorText }}
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Nome"
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
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
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
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Telefone"
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
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Assunto"
                    className="border px-4 py-2"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="flex w-1/2">
              {inputs?.message && (
                <div className="flex w-full flex-col">
                  <label
                    className="text-lg font-bold capitalize"
                    htmlFor="message"
                    style={{ color: colorText }}
                  >
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    cols="50"
                    rows="5"
                    placeholder="Mensagem"
                    className="h-full w-full border px-4 py-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              disabled={isSending}
              style={{
                backgroundColor: colors?.button.bg,
                color: colors?.button.text,
              }}
              className="rounded-full px-20 py-2 text-2xl text-white duration-500 hover:scale-110"
            >
              {isSending ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
          {successMessage && (
            <p className="mt-2 text-green-600">{successMessage}</p>
          )}
          {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}
        </form>
      </div>
    </section>
  )
}
