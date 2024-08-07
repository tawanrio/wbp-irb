import { Paragraph } from './Paragraph'
import { Title } from './Title'

export const Info = ({ info }) => {
  return (
    <section className="mx-auto mt-16 flex w-full max-w-7xl flex-col gap-6 px-6 md:px-14">
      {info.map((inf) => (
        <>
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
        </>
      ))}
    </section>
  )
}
