/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import InputsAddress from './../Components/InputsAddress'
import TemplateMailWorkWithUs from './TemplateMail'
import ReactDOMServer from 'react-dom/server'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function FormWorkWithUs({ setFormData, resetInputs, formData }) {
  const [cnpj, setCnpj] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [curriculum, setCurriculum] = useState('')
  const [structureMail, setStructureMail] = useState({})
  const [html, setHtml] = useState('')

  const [address, setAddress] = useState({})
  const intl = useIntl()
  const messages = intl.messages

  useEffect(() => {
    setHtml(
      ReactDOMServer.renderToString(<TemplateMailWorkWithUs data={formData} />),
    )

    setStructureMail({
      html,
      to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'Trabalhe conosco - IRB',
      subject: 'Trabalhe conosco',
    })

    setFormData({
      inputs: {
        info: {
          cnpj,
          fullName,
          email,
          phone,
          curriculum,
        },
        address,
      },
      structureMail,
    })
  }, [cnpj, fullName, email, phone, curriculum, address])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setCnpj('')
    setEmail('')
    setPhone('')
    setFullName('')
    setCurriculum('')
    setAddress({})
  }

  const handleImg = (event, setState) => {
    // Handle file upload for logo here
    const file = event.target.files[0]
    setState(file)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-2 md:my-0 md:gap-2 md:px-0">
      <div className="flex w-full flex-row flex-wrap justify-between">
        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="fullName">
            <InsertTranslationMsg keyTrans={'component.form.input.name'} />
          </label>
          <input
            type="text"
            id="fullName"
            placeholder={messages['component.form.input.name.placeholder']}
            className="border px-4 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="email">
            <InsertTranslationMsg keyTrans={'component.form.input.email'} />
          </label>
          <input
            type="email"
            id="email"
            placeholder={messages['component.form.input.email.placeholder']}
            className="border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="phone">
            <InsertTranslationMsg keyTrans={'component.form.input.phone'} />
          </label>
          <InputMask
            id="phone"
            mask="(99) 99999-9999"
            maskPlaceholder=""
            placeholder={messages['component.form.input.phone.placeholder']}
            className="border px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mt-2 flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            <InsertTranslationMsg
              id={'component.form.input.workWithUs.attachResume'}
            />
          </label>
          <input
            type="file"
            id="logo"
            accept="image/png, image/jpeg, application/pdf"
            onChange={(e) => handleImg(e, setCurriculum)}
          />
          <span className="text-sm text-slate-400">
            <InsertTranslationMsg keyTrans={'component.contact.mediaFormats'} />
          </span>
        </div>
      </div>

      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}
