import { useState } from 'react'
import { Question } from './Question'

export const CommonQuestions = ({ questions }) => {
  const [openDetailIndex, setOpenDetailIndex] = useState(null)

  const toggleDetail = (index, event) => {
    event.preventDefault()
    if (openDetailIndex === index) {
      setOpenDetailIndex(null)
    } else {
      setOpenDetailIndex(index)
    }
  }

  return (
    <section className="mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-6 md:gap-12 md:px-14">
      <h2 className="text-center text-2xl font-bold leading-tight md:text-3xl">
        Perguntas Frequentes
      </h2>

      <div className="flex flex-col gap-4">
        {questions.map((question, index) => (
          <Question
            key={`${question}-${index}`}
            index={index}
            question={question}
            openDetailIndex={openDetailIndex}
            toggleDetail={toggleDetail}
          />
        ))}
      </div>
    </section>
  )
}
