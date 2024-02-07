import Image from "next/image"
import Link from "next/link"

export default function ButtonTell({data}) {

  return (
    <Link href={data.route}
    target="_blank"
    style={{width: data?.layout?.width, height: data?.layout?.height, backgroundColor: data?.layout?.colors.bg, border: data?.layout?.border}}
    className=" px-5 py-3  rounded-2xl  bg-slate-800 flex flex-col justify-center
     
    ">
      <div className="flex  items-center relative">
        {data?.icon &&( 
          <div className="relative w-10 h-10">
           <Image
              src={data?.icon}
              alt={'Icone button'}
              sizes="100vw"
              fill
              className="
              duration-500
              "
          />
          </div>
        )}
        <span 
        style={{color: data?.layout?.colors.text, fontWeight: data?.layout?.weight }}
        className={`
        md:text-2xl
        text-lg
        absolute 
        w-full 
        text-center
        uppercase
        opacity-100
        
        ${data?.number && ( 'group-hover:opacity-0 ' )}
        duration-500
        ${data?.icon.url && 'ml-2'}
        `}>
          {data?.label}
          </span>
          {data.number && (
            <span 
              style={{color: data?.layout?.colors.text, fontSize: data?.layout?.size, fontWeight: data?.layout?.weight }}
              className={`
              md:text-2xl
              scale-[.82]
              text-lg
              absolute 
              w-full 
              text-center
              uppercase
              opacity-0
              group-hover:opacity-100
              duration-700
              ${data?.icon.url && 'ml-2'}
              `}>
                {data?.number}
            </span>
          )}
      </div>
    </Link>
  )
}