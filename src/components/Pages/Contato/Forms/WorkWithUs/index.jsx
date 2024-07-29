/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import InputsAddress from './../Components/InputsAddress'

export default function FormWorkWithUs({ setFormData, resetInputs }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [curriculum, setCurriculum] = useState('')
  const [address, setAddress] = useState({})

  const phoneRef = useRef(null)

  useEffect(() => {
    setFormData({
      inputs: {
        info: {
          fullName,
          email,
          phone,
          curriculum,
        },
        address,
      },
    })
  }, [fullName, email, phone, curriculum, address])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setEmail('')
    setPhone('')
    setFullName('')
    setCurriculum('')
    setAddress({})
  }

  const handleImg = (event, setState) => {
    const file = event.target.files[0]
    setState(file)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-2 md:my-0 md:gap-2 md:px-0">
      <div className="flex w-full flex-row flex-wrap justify-between">
        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="fullName">
            Nome completo
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Nome completo"
            className="border px-4 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
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
            Anexar currículo
          </label>
          <input
            id="logo"
            type="file"
            accept="image/png, image/jpeg, application/pdf"
            onChange={(e) => handleImg(e, setCurriculum)}
          />
          <span className="text-sm text-slate-400">
            Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 3MB.
          </span>
        </div>
      </div>

      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}
