/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { createModifiedFile } from '@/utils/functions'
import { toast } from 'react-toastify'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function InputsInfo({ setInfo, resetInputs, partnerType }) {
  const [cnpj, setCnpj] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [tradingName, settradingName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [logo, setLogo] = useState('')

  //   const zipCodeRef = useRef(null)

  const cnpjRef = useRef(null)
  const phoneRef = useRef(null)
  const logoRef = useRef(null)
  const intl = useIntl()
  const messages = intl.messages

  const resetForm = () => {
    setCnpj('')
    setEmail('')
    setPhone('')
    setCompanyName('')
    settradingName('')
    setLogo('')
    if (logoRef.current) {
      logoRef.current.value = ''
    }
  }

  useEffect(() => {
    setInfo({
      partnerType,
      cnpj,
      companyName,
      tradingName,
      email,
      phone,
      logo,
    })
  }, [cnpj, companyName, tradingName, email, phone, logo])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

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
    <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold" htmlFor="companyName">
          <InsertTranslationMsg keyTrans={'component.form.input.companyName'} />
        </label>
        <input
          type="text"
          id="companyName"
          placeholder={messages['component.form.input.companyName.placeholder']}
          required
          className="border px-4 py-2"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold" htmlFor="tradingName">
          <InsertTranslationMsg keyTrans={'component.form.input.tradingName'} />
        </label>
        <input
          type="text"
          id="tradingName"
          required
          placeholder={messages['component.form.input.tradingName.placeholder']}
          className="border px-4 py-2"
          value={tradingName}
          onChange={(e) => settradingName(e.target.value)}
        />
      </div>
      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold" htmlFor="cnpj">
          <InsertTranslationMsg keyTrans={'component.form.input.cnpj'} />
        </label>
        <InputMask
          id="cnpj"
          mask="99.999.999/9999-99"
          ref={cnpjRef}
          required
          placeholder={messages['component.form.input.cnpj.placeholder']}
          className="border px-4 py-2"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold" htmlFor="email">
          <InsertTranslationMsg keyTrans={'component.form.input.email'} />
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder={messages['component.form.input.email.placeholder']}
          className="border px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold" htmlFor="phone">
          <InsertTranslationMsg keyTrans={'component.form.input.phone'} />
        </label>
        <InputMask
          id="phone"
          mask="(99) 99999-9999"
          ref={phoneRef}
          required
          placeholder={messages['component.form.input.phone.placeholder']}
          className="border px-4 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mt-2 flex flex-col">
        <label className="text-lg font-bold" htmlFor="logo">
          <InsertTranslationMsg keyTrans={'component.form.input.logo'} />
        </label>
        <input
          type="file"
          required
          id="logo"
          ref={logoRef}
          accept="image/png, image/jpeg"
          onChange={(e) => handleImg(e, setLogo)}
        />
        <span className="mt-1 text-sm text-slate-400">
          <InsertTranslationMsg keyTrans={'component.form.mediaFormats'} />
        </span>
      </div>
    </div>
  )
}
