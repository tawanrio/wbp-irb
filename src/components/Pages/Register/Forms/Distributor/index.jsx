/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { createModifiedFile } from '@/utils/functions'
import InputsAddress from './../Components/InputsAddress'
import { toast } from 'react-toastify'

export default function FormDistributor({
  setInputs,
  resetInputs,
  partnerType,
}) {
  const [cnpj, setCnpj] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [tradingName, settradingName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [logo, setLogo] = useState('')
  const [address, setAddress] = useState({})

  const cnpjRef = useRef(null)
  const phoneRef = useRef(null)

  useEffect(() => {
    setInputs({
      info: {
        partnerType,
        cnpj,
        companyName,
        tradingName,
        email,
        phone,
        logo,
      },
      address,
    })
  }, [cnpj, companyName, tradingName, email, phone, logo, address])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setCnpj('')
    setEmail('')
    setPhone('')
    setCompanyName('')
    settradingName('')
    setLogo('')
    setAddress({})
  }

  const handleImg = (event, setState) => {
    const file = createModifiedFile(event.target.files[0])
    if (!file) {
      return
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/heic']
    if (!validImageTypes.includes(file.type)) {
      toast.error('Por favor selecione uma imagem válida.')
      return
    }

    setState(file)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-2 md:my-0 md:gap-2 md:px-0">
      <div className="flex w-full flex-row flex-wrap justify-between">
        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="companyName">
            Razão social
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Razão social"
            required
            className="border px-4 py-2"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="tradingName">
            Nome fantasia
          </label>
          <input
            type="text"
            id="tradingName"
            required
            placeholder="Nome fantasia"
            className="border px-4 py-2"
            value={tradingName}
            onChange={(e) => settradingName(e.target.value)}
          />
        </div>
        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="cnpj">
            CNPJ
          </label>
          <InputMask
            id="cnpj"
            mask="99.999.999/9999-99"
            ref={cnpjRef}
            required
            placeholder="CNPJ"
            className="border px-4 py-2"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
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

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="phone">
            Telefone
          </label>
          <InputMask
            id="phone"
            mask="(99) 99999-9999"
            ref={phoneRef}
            required
            placeholder="Telefone"
            className="border px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Anexar logomarca
          </label>
          <input
            type="file"
            required
            id="logo"
            accept="image/png, image/jpeg"
            onChange={(e) => handleImg(e, setLogo)}
          />
          <span className="text-sm text-slate-400">
            Formatos suportados: JPEG, PNG; Dimensões: 400x200 pixels; Tamanho
            máximo do arquivo: 3MB.
          </span>
        </div>
      </div>

      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}
