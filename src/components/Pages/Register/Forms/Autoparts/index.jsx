/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { createModifiedFile } from '@/utils/functions'
import InputsAddress from './../Components/InputsAddress'
import 'react-toastify/dist/ReactToastify.css'

export default function FormAutoparts({ setInputs, resetInputs, partnerType }) {
  const [cnpj, setCnpj] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [whereToBuy, setWhereToBuy] = useState('')
  const [tradingName, settradingName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [logo, setLogo] = useState(null)
  const [address, setAddress] = useState({})

  const cnpjRef = useRef(null)
  const phoneRef = useRef(null)
  const logoRef = useRef(null)

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
        whereToBuy,
      },
      address,
    })
  }, [cnpj, companyName, tradingName, email, phone, logo, address, whereToBuy])

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
    setWhereToBuy('')
    setAddress({})

    if (logoRef.current) {
      logoRef.current.value = ''
    }
  }

  const handleImg = (event, setState) => {
    const file = createModifiedFile(event.target.files[0])
    setState(file)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 md:my-0 md:gap-2 md:px-0">
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="partnerType">
            Em qual distribuidor você adquiri os produtos IRB
          </label>
          <input
            id="whereToBuy"
            type="text"
            placeholder="Em qual distribuidor você adquiri os produtos IRB"
            className="border px-4 py-2"
            required
            value={whereToBuy}
            onChange={(e) => setWhereToBuy(e.target.value)}
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="companyName">
            Razão social
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Razão Social"
            className="border px-4 py-2"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="tradingName">
            Nome fantasia
          </label>
          <input
            id="tradingName"
            type="text"
            placeholder="Nome fantasia"
            className="border px-4 py-2"
            required
            value={tradingName}
            onChange={(e) => settradingName(e.target.value)}
          />
        </div>
        <div className="mt-2 flex flex-col">
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

        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="E-mail"
            className="border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-2 flex flex-col">
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

        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold capitalize" htmlFor="logo">
            Anexar logomarca
          </label>
          <input
            id="logo"
            type="file"
            required
            ref={logoRef}
            accept="image/png, image/jpeg"
            onChange={(e) => handleImg(e, setLogo)}
          />
          <span className="mt-1 text-sm text-slate-400">
            Formatos suportados: JPEG, PNG; Dimensões: 400x200 pixels; Tamanho
            máximo do arquivo: 3MB.
          </span>
        </div>
      </div>

      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}
