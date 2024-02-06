import { useEffect, useState } from "react"
import SectionTitle from "../SectionTitle"
import Select from "./components/Select"
import Description from "../Description"

export default function Index({select, title}) {

  const [filter, setFilter] = useState()
  const [content, setContent] = useState()

  useEffect(()=>{
    setContent([])
  },[filter])


  return (
    <section className="flex flex-col items-center " id={`products_`}>
      <div className="w-full max-w-7xl md:px-14 px-6 md:mt-10 md:mb-[-15px] my-4  flex flex-col justify-between md:gap-10">
        <SectionTitle title={title} line />
        <div className="
            flex
            justify-center
            gap-10
            ">
            <Select textDefault={"Selecione o modelo"} select={select} set={setFilter} />
          {filter &&
            <Select textDefault={"Selecione"} select={select} filter={filter} content={content} setContent={setContent} />
          }
        </div>
        <div className={`${ content?.length > 0 &&( "mb-10")}`}>
          {content && <Description content={content}  />}
        </div>
      </div>
    </section>
  )
}