import { useState } from 'react'
import { Paragraph } from './Paragraph'
import { Title } from './Title'

export const Info = ({ info }) => {
  const [showAll, setShowAll] = useState(false)

  const handleReadMore = () => {
    setShowAll(true)
  }

  const itemsToShow = showAll ? info : info.slice(0, 2)

  return (
    <section className="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-6 px-5">
      {itemsToShow.map((inf, index) => (
        <div key={index} className="flex w-full flex-col gap-8 sm:gap-10">
          {inf.title && Object.entries(inf.title).length > 0 && (
            <Title tag={inf.title.tag}>{inf.title.name}</Title>
          )}
          {Array.isArray(inf.paragraphs) &&
            inf.paragraphs.map((paragraph, index) => (
              <Paragraph key={`${paragraph}-${index}`} tag="p">
                {paragraph}
              </Paragraph>
            ))}
          {Array.isArray(inf.topics) && (
            <ul className="m-6 flex flex-col gap-y-8 md:ml-10">
              {inf.topics.map((topic, index) => (
                <Paragraph tag="li" key={`${topic}-${index}`}>
                  {topic}
                </Paragraph>
              ))}
            </ul>
          )}
        </div>
      ))}
      {!showAll && info.length > 2 && (
        <button
          onClick={handleReadMore}
          className="mt-4 w-fit text-left text-black underline hover:no-underline"
        >
          Ler Mais
        </button>
      )}
    </section>
  )
}
