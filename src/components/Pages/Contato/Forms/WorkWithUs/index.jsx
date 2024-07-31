/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import InputsAddress from './../Components/InputsAddress'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'
import { useIntl } from 'react-intl'

export default function FormWorkWithUs({ setFormData, resetInputs }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [curriculum, setCurriculum] = useState('')
  const [address, setAddress] = useState({})

  const phoneRef = useRef(null)
  const curriculumRef = useRef(null)
  const intl = useIntl()
  const messages = intl.messages

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
        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="fullName">
            <InsertTranslationMsg keyTrans={'component.form.input.name'} />
          </label>
          <input
            id="fullName"
            type="text"
            required
            placeholder={messages['component.form.input.name.placeholder']}
            className="border px-4 py-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="email">
            <InsertTranslationMsg keyTrans={'component.form.input.email'} />
          </label>
          <input
            id="email"
            type="email"
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
            <InsertTranslationMsg
              id={'component.form.input.workWithUs.attachResume'}
            />
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
          <InsertTranslationMsg keyTrans={'component.contact.mediaFormats'} />
          </span>
        </div>
      </div>

      <InputsAddress setAddress={setAddress} resetInputs={resetInputs} />
    </div>
  )
}
