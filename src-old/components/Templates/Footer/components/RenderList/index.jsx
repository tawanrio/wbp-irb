import {RenderListItem} from './RenderListItem';

export default function RenderList({nav, colors}) {

  return (
    <>
    {nav?.map((items, ulId) => (
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
            items?.links?.map((li, liId) =>(
            <RenderListItem key={liId} liId={liId} content={li} colors={colors}/>
            ))
          }
      </ul>
        </div>
    ))}

  </>
)
}