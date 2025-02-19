/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import InputMask from 'react-input-mask'
import InputsAddress from './../Components/InputsAddress'

export default function FormAutoparts({ setFormData, resetInputs }) {
  const [cnpj, setCnpj] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [whereToBuy, setWhereToBuy] = useState('')
  const [tradingName, settradingName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [logo, setLogo] = useState(null)

  const [address, setAddress] = useState({})

  useEffect(() => {
    setFormData({
      info: {
        cnpj,
        companyName,
        tradingName,
        email,
        phone,
        logo,
      },
      address,
      requirements: {
        whereToBuy,
      },
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
    setWhereToBuy('')
    setAddress({})
  }

  const handleImg = (event, setState) => {
    // Handle file upload for logo here
    const file = event.target.files[0]
    setState(file)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 md:my-0 md:gap-2 md:px-0">
      <div className="flex w-full flex-row flex-wrap justify-between">
        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="partnerType">
            Em qual distribuidor você adquire os produtos IRB?
          </label>
          <input
            type="text"
            id="whereToBuy"
            placeholder="Em qual distribuidor você adquire os produtos IRB?"
            className="border px-4 py-2"
            value={whereToBuy}
            onChange={(e) => setWhereToBuy(e.target.value)}
          />
          {/* <select
                id="partnerType"
                className="border py-2 px-4"
                value={partnerType}
                onChange={(e) => handlePartnerType(e.target.value)}
              >
                <option value="">Área de Atuação</option>
                <option value="distribuidoras">Distribuidoras</option>
                <option value="mecanicas">Mecânicas</option>
                <option value="autopecas">Autopeças</option>
              </select> */}
        </div>
        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="companyName">
            Razão social
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Razão Social"
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
            mask="99.999.999/9999-99"
            maskPlaceholder=""
            id="cnpj"
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
            maskPlaceholder=""
            placeholder="Telefone"
            className="border px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold capitalize" htmlFor="logo">
            Anexar logomarca
          </label>
          <input
            type="file"
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

      <InputsAddress setAddress={setAddress} />
    </div>
  )
}
