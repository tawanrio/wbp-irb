import { Paragraph } from './Paragraph'
import { Title } from './Title'

export const BearingInfo = ({ description }) => {
  return (
    <section className="mx-auto mt-24 flex w-full max-w-7xl flex-col gap-6 px-6 md:px-14">
      {description.map((des) => (
        <>
          {des.title && Object.entries(des.title).length > 0 && (
            <Title tag={des.title.tag}>{des.title.name}</Title>
          )}
          {!!des.paragraph && <Paragraph tag="p">{des.paragraph}</Paragraph>}
          {Array.isArray(des.topics) && (
            <ul className="ml-6 mt-6 flex flex-col gap-y-8 md:ml-10">
              {des.topics.map((topic, index) => (
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
