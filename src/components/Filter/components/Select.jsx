import { useEffect } from "react";

export default function Select({ select, set, filter, content, setContent, textDefault}) {
 
  const handleSet = (e) =>{
    set && set(e.target.value);
    content && setContent(e.target.value.split(','));
  }
  return (
    <select value={content}  onChange={handleSet}  
    className={`
    bg-neutral-100
    appearance-none
    py-5
    px-5
    rounded-lg
    w-3/12
    uppercase
    text-base text-gray-900 border   focus:ring-blue-500 focus:border-blue-500 
    `}
    >
       <option value='' >{textDefault}</option>

       {filter ?
  (
    <>
     {select
    .filter((option) => option.title === filter) // Filtra as opções com base no título
    .map((option) =>
      option?.items.map((filterOption, fId) => (
        <option key={fId} value={filterOption.contentDescription} >
          {filterOption.title}
        </option>
      ))
    )}
    </>
  ) :   (
    <>
     {select?.map((option, id)=>(
        <option key={id} value={option.title} >{option.title}</option>
      ))}
    </>
  )     
       }
    </select>
  )
}