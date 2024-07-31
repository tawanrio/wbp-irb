/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { useIntl } from 'react-intl'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'

export default function FormOthers({ setFormData, resetInputs }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const phoneRef = useRef(null)
  const intl = useIntl()
  const messages = intl.messages

  useEffect(() => {
    setFormData({
      inputs: {
        info: {
          fullName,
          email,
          phone,
          message,
        },
      },
    })
  }, [fullName, email, phone, message])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setFullName('')
    setEmail('')
    setPhone('')
    setMessage('')
  }

  return (
    <div className="flex w-full flex-col justify-between gap-2 md:my-0 md:gap-2 md:px-0">
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        <div className="flex flex-col">
          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold" htmlFor="fullName">
              <InsertTranslationMsg keyTrans={'component.form.input.name'} />
            </label>
            <input
              id="fullName"
              placeholder={messages['component.form.input.name.placeholder']}
              required
              className="border px-4 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mt-2 flex w-full flex-col">
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

          <div className="mt-2 flex w-full flex-col">
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
        </div>
        <div className="flex flex-col">
          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold capitalize" htmlFor="message">
              <InsertTranslationMsg keyTrans={'component.form.input.message'} />
            </label>
            <textarea
              id="message"
              name="message"
              cols="50"
              required
              placeholder={messages['component.form.input.message.placeholder']}
              className="h-[196px] w-full border px-4 py-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
