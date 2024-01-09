import {RenderListItem} from './RenderListItem';

export default function RenderList({list}) {

  return (
    <>
    {list.map((ul, ulId) => (
        <div key={ulId} 
        className='
        md:flex-1
        md:mx-3
        md:first:ml-0
        font-light
        mb-6
        flex-1
        '>
        <ul className='
        flex
        flex-col
        gap-2
        
        '>
          {
            ul.map((li, liId) =>(<RenderListItem key={liId} liId={liId} name={li.name} href={li.url}/>))
          }
        </ul>
      </div>
    ))
}
  </>
)
}