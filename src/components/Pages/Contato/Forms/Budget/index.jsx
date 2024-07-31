/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import TemplateMailBudget from './TemplateMail'
import ReactDOMServer from 'react-dom/server'

export default function FormBudget({
  setFormData,
  formData,
  resetInputs,
  categories,
  setResponseMessage,
}) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [product, setProduct] = useState('')
  const [address, setAddress] = useState({})
  const [productLine, setProductLine] = useState('')
  const [html, setHtml] = useState('')
  const [structureMail, setStructureMail] = useState({})
  const [errors, setErrors] = useState({})

  // setResponseMessage({
  //   success:"Orçamento enviado com sucesso, aguarde contato em breve!",
  //   error: "Erro ao tentar enviar orçamento."
  // })

  const resetForm = () => {
    setEmail('')
    setPhone('')
    setFullName('')
    setMessage('')
    setProduct('')
    setProductLine('')
    setHtml('')
  }

  useEffect(() => {
    setHtml(
      ReactDOMServer.renderToString(<TemplateMailBudget data={formData} />),
    )

    setStructureMail({
      html,
      to: process.env.NEXT_PUBLIC_EMAIL_TO_SEND,
      cco: ['tawan.rio@webfoco.com', 'rodrigo.silva@webfoco.com'],
      from: 'Orçamento IRB',
      subject: 'Pedido de orçamento',
    })

    setFormData({
      inputs: {
        info: {
          message,
          fullName,
          email,
          phone,
          product,
          productLine,
        },
        address,
      },
      structureMail,
    })
  }, [fullName, email, phone, message, product, productLine])

  // useEffect(()=>{
  //   resetForm();
  // },[resetInputs])

  const validateForm = () => {
    const newErrors = {}
    if (!fullName) newErrors.fullName = 'Nome completo é obrigatório'
    if (!email) newErrors.email = 'E-mail é obrigatório'
    if (!phone) newErrors.phone = 'Telefone é obrigatório'
    if (!product) newErrors.product = 'Produto é obrigatório'
    if (!productLine) newErrors.productLine = 'Linha do produto é obrigatória'
    if (!message) newErrors.message = 'Mensagem é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    const { info, address, html } = formData
    const payload = { info, address, html }

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    console.log(result.message)

    resetForm()
  }

  return (
    <div className="flex w-full flex-col justify-between md:px-0">
      <div className="flex w-full flex-row flex-wrap justify-between">
        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="product">
            Produto
          </label>
          <select
            id="product"
            className="border px-4 py-2"
            required
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {categories.map((category) => (
              <option key={category.label} value={category.label}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.product && (
            <span className="text-red-500">{errors.product}</span>
          )}
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="productLine">
            Linha
          </label>
          <input
            type="text"
            id="productLine"
            placeholder="Informe a linha do produto"
            className="border px-4 py-2"
            value={productLine}
            onChange={(e) => setProductLine(e.target.value)}
          />
          {errors.productLine && (
            <span className="text-red-500">{errors.productLine}</span>
          )}
        </div>
      </div>
      <div className="flex w-full flex-row flex-wrap justify-between gap-2">
        <div className="flex w-[48%] flex-col">
          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold" htmlFor="fullName">
              Nome completo
            </label>
            <input
              type="text"
              id="fullName"
              required
              placeholder="Nome completo"
              className="border px-4 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName}</span>
            )}
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
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold" htmlFor="phone">
              Telefone
            </label>
            <InputMask
              id="phone"
              mask="(99) 99999-9999"
              required
              maskPlaceholder=""
              placeholder="Telefone"
              className="border px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone}</span>
            )}
          </div>
        </div>
        <div className="flex w-[48%] flex-col">
          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold capitalize" htmlFor="message">
              Mensagem
            </label>
            <textarea
              name="message"
              required
              id="message"
              cols="50"
              placeholder="Mensagem"
              className="h-[196px] w-full border px-4 py-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && (
              <span className="text-red-500">{errors.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
