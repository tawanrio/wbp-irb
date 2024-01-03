import { useEffect, useState } from "react"
import SectionTitle from "../SectionTitle"
import Select from "./components/Select"
import Filter from "./components/Filter"

export default function Index() {
    const select = [
        {
          title: 'Linha',
          items : [
            {
                title: 'linha taltal',
              contentDescription : [
                'Descricao',
                'loren ipson'
              ]
    
            },
            {
                title: 'linha blabla',
              contentDescription : [
                'Descricao',
                'loren ipson'
              ]
    
            }
          ]
        },
        {
          title: 'código',
          items : [
            {
                title: 'código taltal',
              contentDescription : [
                'Descricao',
                'loren ipson'
              ]
    
            },
            {
                title: 'código blabla',
              contentDescription : [
                'Descricao',
                'loren ipson'
              ]
    
            }
          ]
        },
        {
          title: 'veículo',
          items : [
            {
                title: 'veículo taltal',
              contentDescription : [
                'Descricao',
                'loren ipson'
              ]
    
            },
            {
                title: 'veículo blabla',
              contentDescription : [
                'Descricao',
                'loren ipson'
              ]
    
            }
          ]
        }
      ]

      const [filter, setFilter] = useState()

      
    return (
        <section className="flex flex-col items-center " id={`products_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4  flex flex-col justify-between md:gap-10">
            <SectionTitle title={'Filtro'} line/>
            <div>
                <span>Filtro:</span>{filter}
                <br/>
                
                <Select select={select} set={setFilter}/>
                {filter && 
                <Filter select={select} filter={filter} />
                }
            </div>
            </div>
        </section>
    )
}