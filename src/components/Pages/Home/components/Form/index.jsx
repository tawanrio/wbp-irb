import React, { useState } from 'react'
import SectionTitle from '@/components/SectionTitle'

export default function DynamicForm({ form }) {
  // Initialize state for each input
  const initialState = form.inputs.reduce((acc, input) => {
    acc[input.id] = ''
    return acc
  }, {})

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  // Separate inputs and textareas
  const inputFields = form.inputs.filter((input) => input.type !== 'textarea')
  const textAreaFields = form.inputs.filter(
    (input) => input.type === 'textarea',
  )

  return (
    <section className="flex flex-col items-center" id={`contact_`}>
      <div className="my-4 mb-10 flex w-full max-w-7xl flex-col justify-between gap-10 px-6 md:my-7 md:px-14">
        <SectionTitle title={form.title} line />
        <form>
          {inputFields.map((input) => (
            <div className="mb-4 flex flex-col" key={input.id}>
              <label
                className="text-lg font-bold capitalize"
                htmlFor={input.for}
              >
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                placeholder={input.placehold}
                className="border px-4 py-2"
                value={formState[input.id]}
                onChange={handleChange}
              />
            </div>
          ))}
          {textAreaFields.map((input) => (
            <div className="mb-4 flex flex-col" key={input.id}>
              <label
                className="text-lg font-bold capitalize"
                htmlFor={input.for}
              >
                {input.label}
              </label>
              <textarea
                id={input.id}
                placeholder={input.placehold}
                className="border px-4 py-2"
                value={formState[input.id]}
                onChange={handleChange}
              />
            </div>
          ))}
        </form>
      </div>
    </section>
  )
}
