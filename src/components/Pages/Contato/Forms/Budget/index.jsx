/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { useIntl } from 'react-intl'
import InsertTranslationMsg from '@/components/InsertTranslationMsg'


export default function FormBudget({ setFormData, resetInputs, categories }) {
  const [product, setProduct] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [productLine, setProductLine] = useState('')
  const [message, setMessage] = useState('')
  const intl = useIntl()
  const messages = intl.messages
  const phoneRef = useRef(null)

  useEffect(() => {
    setFormData({
      inputs: {
        info: {
          message,
          fullName,
          email,
          phone,
          product,
          productLine,
        },
      },
    })
  }, [fullName, email, phone, message, product, productLine])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setProduct('')
    setFullName('')
    setEmail('')
    setPhone('')
    setProductLine('')
    setMessage('')
  }

  return (
    <div className="flex w-full flex-col justify-between md:px-0">
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="product">
            <InsertTranslationMsg
              keyTrans={'component.contact.budget.product'}
            />
          </label>
          <select
            id="product"
            className="appearance-none border bg-custom-arrow bg-[calc(100%-1rem)_center] bg-no-repeat px-4 py-2"
            required
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <InsertTranslationMsg
              keyTrans={'component.contact.budget.select'}
              value=""
              tag="option"
            />

            {categories.map((category) => (
              <option key={category.label} value={category.label}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 flex flex-col">
          <label className="text-lg font-bold" htmlFor="productLine">
            <InsertTranslationMsg
              keyTrans={'component.contact.budget.select.line'}
            />
          </label>
          <input
            id="productLine"
            type="text"
            required
            placeholder={
              messages['component.contact.budget.select.line.placeholder']
            }
            className="border px-4 py-2"
            value={productLine}
            onChange={(e) => setProductLine(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        <div className="flex flex-col">
          <div className="mt-2 flex w-full flex-col">
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
              placeholder={
                messages['component.contact.budget.select.phone.placeholder']
              }
              className="border px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <div className="mt-2 flex w-full flex-col">
            <label className="text-lg font-bold capitalize" htmlFor="message">
              <InsertTranslationMsg keyTrans={'component.form.input.message'} />
            </label>
            <textarea
              id="message"
              required
              name="message"
              cols="50"
              placeholder={
                messages['component.contact.budget.select.message.placeholder']
              }
              className="h-[12.375rem] w-full resize-none border px-4 py-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
