import { useRef, useState } from 'react'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import { RESPONSE_MESSAGES } from '@/utils/constants'
import 'react-toastify/dist/ReactToastify.css'
import mechanic from '@/../public/images/pages/autoparts/mechanic.png'
import Image from 'next/image'
import Link from 'next/link'
import { createModifiedFile } from '@/utils/functions'
import { useIntl } from 'react-intl'

export const FormContact = ({ inputs }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [formType, setFormType] = useState('contact-us')
  const [curriculum, setCurriculum] = useState(null)
  const intl = useIntl()
  const messages = intl.messages

  const phoneRef = useRef(null)
  const curriculumRef = useRef(null)

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setCurriculum(null)
  }

  const handleImg = (event, setState) => {
    const file = createModifiedFile(event.target.files[0])
    setState(file)
  }

  const sendMessage = async (data) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/forms',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    return response.ok
  }
  const handleButtonClick = (type) => {
    setFormType(type)
  }

  const uploadCurriculumToDB = async (dataCurriculum) => {
    const responseCurriculum = await insertImgDatabase(dataCurriculum, email)
    if (!responseCurriculum || responseCurriculum.status !== 200) {
      throw new Error(
        'Falha ao fazer upload do currículo para o banco de dados',
      )
    }
    // data.inputs.info.curriculum = responseCurriculum?.path
    //   ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseCurriculum.path}`
    //   : ''
    const fullPathCurriculum = responseCurriculum?.path
      ? `${process.env.NEXT_PUBLIC_UPLOAD_IMAGES}${responseCurriculum.path}`
      : ''

    return fullPathCurriculum
  }
  const insertImgDatabase = async (img, cnpj) => {
    const data = new FormData()
    data.append('file', img)
    data.append('origin', 'register')
    data.append('id', cnpj)

    const response = await fetch(
      process.env.NEXT_PUBLIC_UPLOAD_IMAGES + '/communication/files/upload',
      {
        method: 'POST',
        body: data,
      },
    )

    return response.json()
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setIsSending(true)

    try {
      let curr
      if (curriculum) {
        curr = await uploadCurriculumToDB(curriculum)
      }

      const messageContact = await sendMessage({
        name,
        email,
        tel: phone,
        subject: curr ? 'Trabalhar na IRB' : 'Novo Contato',
        curriculum: curr,
        message,
      })
      if (!messageContact) {
        throw new Error(RESPONSE_MESSAGES.error.emailJob)
      }

      toast.success(RESPONSE_MESSAGES.success)
      resetForm()
    } catch (error) {
      toast.error(RESPONSE_MESSAGES.error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      id="contact_"
      className="relative mx-auto my-4 mb-10 flex w-full max-w-7xl flex-row items-end justify-end gap-12 px-6 md:my-7 md:px-14"
    >
      <Image
        src={mechanic}
        alt="Mecânico"
        width={564.73}
        height={849}
        className={`absolute bottom-0 left-0 top-24 -z-10 hidden opacity-40 md:block lg:opacity-100 ${formType === 'work-us' && '!top-48'}`}
      />
      <section className="flex flex-col items-center gap-4">
        <div className="flex w-full max-w-[505.91px] flex-col items-end">
          <h2 className="bg-[linear-gradient(90deg,#982225_-80%,#22326E_100%)] bg-clip-text text-end text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            {messages['component.contact.form.titlel1']}
          </h2>
          <h3 className="bg-[linear-gradient(90deg,#982225_-80%,#22326E_100%)] bg-clip-text text-end text-4xl font-bold !leading-[1.2] text-transparent sm:text-5xl md:text-6xl">
            {messages['component.contact.form.titlel2']}
          </h3>
        </div>

        <div className="flex w-full max-w-[505.91px] flex-col items-end gap-10">
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="nome" className="text-lg font-black text-[#22326E]">
              {messages['component.contact.form.reason']}
            </label>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleButtonClick('contact-us')}
                className={`rounded-full bg-[#5c5454] px-10 py-2 text-sm uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100 ${formType === 'contact-us' && '!bg-[#982225]'}`}
              >
                {messages['component.contact.form.reason.contactus']}
              </button>
              <button
                onClick={() => handleButtonClick('work-us')}
                className={`rounded-full bg-[#5c5454] px-10 py-2 text-sm uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100 ${formType === 'work-us' && '!bg-[#982225]'}`}
              >
                {messages['component.contact.form.reason.workus']}
              </button>
              <Link
                href="/registre-se"
                className="shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25) rounded-full bg-[#5c5454] px-10 py-2 text-sm uppercase text-white transition-all duration-200 hover:scale-95 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100"
              >
                {messages['component.contact.form.reason.partner']}
              </Link>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex w-full max-w-[505.91px] flex-col items-end gap-10"
        >
          <div className="flex w-full flex-col gap-6">
            {inputs?.name && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="nome"
                  className="text-lg font-black capitalize text-[#22326E]"
                >
                  {messages['component.contact.form.name']}
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  className="rounded-full border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            {inputs?.email && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-lg font-black text-[#22326E]"
                >
                  {messages['component.contact.form.email']}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="rounded-full border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {inputs?.phone && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-lg font-black text-[#22326E]"
                >
                  {messages['component.contact.form.tel']}
                </label>
                <InputMask
                  id="phone"
                  mask="(99) 99999-9999"
                  ref={phoneRef}
                  required
                  className="rounded-full border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}
            {formType === 'work-us' && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-lg font-black text-[#22326E]"
                >
                  {messages['component.contact.form.curriculum']}
                </label>
                <input
                  id="curriculum"
                  type="file"
                  required
                  ref={curriculumRef}
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleImg(e, setCurriculum)}
                />
              </div>
            )}
            {inputs?.message && (
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="message"
                  className="text-lg font-black text-[#22326E]"
                >
                  {messages['component.contact.form.message']}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  cols="50"
                  rows="5"
                  className="h-[165.36px] w-full resize-none rounded-2xl border border-solid border-[#FFFFFFC2] bg-[#D9D9D9D4] px-4 py-2 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            )}
          </div>
          <button
            disabled={isSending}
            type="submit"
            className="rounded-full bg-[#982225] px-10 py-2 text-lg uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95 disabled:cursor-default disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSending
              ? messages['component.home.form.sending']
              : messages['component.home.form.send']}
          </button>
        </form>
      </section>
    </section>
  )
}
