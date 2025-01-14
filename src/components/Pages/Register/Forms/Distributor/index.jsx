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
    setLogo(null)
    setAddress({})

    if (logoRef.current) {
      logoRef.current.value = ''
    }
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
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="companyName">
            Razão social
          </label>
          <input
            id="companyName"
            type="text"
            required
            className="border px-4 py-2"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </fieldset>

        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="tradingName">
            Nome fantasia
          </label>
          <input
            id="tradingName"
            type="text"
            required
            className="border px-4 py-2"
            value={tradingName}
            onChange={(e) => settradingName(e.target.value)}
          />
        </fieldset>
        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="cnpj">
            CNPJ
          </label>
          <InputMask
            id="cnpj"
            mask="99.999.999/9999-99"
            ref={cnpjRef}
            required
            className="border px-4 py-2"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </fieldset>

        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            className="border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="phone">
            Telefone
          </label>
          <InputMask
            id="phone"
            mask="(99) 99999-9999"
            ref={phoneRef}
            required
            className="border px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </fieldset>

        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
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
        </fieldset>
      </div>

      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}
