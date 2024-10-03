import { useState } from 'react'
import { Question } from './Question'

export const CommonQuestions = ({ faq }) => {
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
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 md:gap-12 md:px-14 md:py-28">
      <h2 className="text-center font-['Libre_Baskerville'] text-3xl font-medium italic leading-tight text-[#982225] sm:text-4xl lg:text-5xl">
        {faq?.title}
      </h2>

      <div className="flex flex-col gap-4">
        {faq?.items?.map((question, index) => (
          <Question
            key={`${question}-${index}`}
            index={index}
            faq={question}
            openDetailIndex={openDetailIndex}
            toggleDetail={toggleDetail}
          />
        ))}
      </div>
    </section>
  )
}
