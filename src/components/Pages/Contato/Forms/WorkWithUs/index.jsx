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
  const curriculumRef = useRef(null)

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

    if (curriculumRef.current) {
      curriculumRef.current.value = ''
    }
  }

  const handleImg = (event, setState) => {
    const file = event.target.files[0]
    setState(file)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-2 md:my-0 md:gap-2 md:px-0">
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="fullName">
            Nome completo
          </label>
          <input
            id="fullName"
            type="text"
            required
            placeholder="Nome completo"
            className="border px-4 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            placeholder="E-mail"
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
            placeholder="Telefone"
            className="border px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </fieldset>

        <fieldset className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Anexar currículo
          </label>
          <input
            id="curriculum"
            type="file"
            required
            ref={curriculumRef}
            accept="application/pdf"
            onChange={(e) => handleImg(e, setCurriculum)}
          />
          <span className="mt-1 text-sm text-slate-400">
            Formatos suportados: PDF; Tamanho máximo do arquivo: 5MB.
          </span>
        </fieldset>
      </div>

      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}
