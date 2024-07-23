import { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle'
import Select from './components/Select'
import Description from '../Description'

export default function Index({ select, title }) {
  const [filter, setFilter] = useState()
  const [content, setContent] = useState()

  useEffect(() => {
    setContent([])
  }, [filter])

  return (
    <section className="flex flex-col items-center" id={`products_`}>
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:mb-[-15px] md:mt-10 md:gap-10 md:px-14">
        <SectionTitle title={title} line />
        <div className="flex flex-col justify-center gap-10 py-5 md:flex-row md:py-0">
          <Select
            textDefault={'Selecione o modelo'}
            select={select}
            set={setFilter}
          />
          {filter && (
            <Select
              textDefault={'Selecione'}
              select={select}
              filter={filter}
              content={content}
              setContent={setContent}
            />
          )}
        </div>
        <div className={`${content?.length > 0 && 'mb-10 md:mt-0'}`}>
          {content && <Description content={content} />}
        </div>
      </div>
    </section>
  )
}
