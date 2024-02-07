import { useEffect } from "react";
import Image from "next/image";
export default function Select({ select, set, filter, content, setContent, textDefault}) {
 
  const handleSet = (e) =>{
    set && set(e.target.value);
    content && setContent(e.target.value.split(','));
  }
  return (
    <div className=" justify-center items-center flex">
    <select value={content}  onChange={handleSet}  
    className={`
    bg-[#D9D9D9]
    appearance-none
    py-5
    px-5
    text-center
    rounded-lg
    w-[300px]
    font-medium
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
    <div className="relative w-[15px] h-[15px]">
      <Image
        fill
        sizes="100vw"
        src={"/images/components/icons/pol-filter.png"}
        alt="icon arrow select"
        className="translate-x-[-35px]"
      />
    </div>
    </div>
  )
}