/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import TemplateMailOthers from './TemplateMail'
import ReactDOMServer from 'react-dom/server'

export default function FormOthers({ setFormData, resetInputs, formData }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [html, setHtml] = useState('')
  const [structureMail, setStructureMail] = useState({})
  const [address, setAddress] = useState({})

  useEffect(() => {
    setHtml(
      ReactDOMServer.renderToString(<TemplateMailOthers data={formData} />),
    )

    setStructureMail({
      html,
      to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'Contato IRB',
      subject: 'Contato IRB',
    })

    setFormData({
      inputs: {
        info: {
          message,
          fullName,
          email,
          phone,
        },
        address,
      },
      structureMail,
    })
  }, [fullName, email, phone, message])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setEmail('')
    setPhone('')
    setFullName('')
    setMessage('')
  }

  return (
    <div className="flex w-full flex-col justify-between gap-2 md:my-0 md:gap-2 md:px-0">
      <div className="flex w-full flex-row flex-wrap justify-between gap-2">
        <div className="flex w-[48%] flex-col">
          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold" htmlFor="fullName">
              Nome completo
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Nome completo"
              required
              className="border px-4 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="E-mail"
              className="border px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold" htmlFor="phone">
              Telefone
            </label>
            <InputMask
              id="phone"
              mask="(99) 99999-9999"
              maskPlaceholder=""
              required
              placeholder="Telefone"
              className="border px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-[48%] flex-col">
          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold capitalize" htmlFor="message">
              Mensagem
            </label>
            <textarea
              name="message"
              id="message"
              cols="50"
              required
              placeholder="Mensagem"
              className="h-[196px] w-full border px-4 py-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
