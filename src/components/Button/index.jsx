import Image from "next/image"
import Link from "next/link"

export default function ButtonTell({data}) {
  return (
    <Link href={data?.route}
    style={{width: data?.font.width, height: data?.font.height, backgroundColor: data?.font.colors.bg, border: data?.font.border}}
    className=" px-5 py-3  rounded-2xl  bg-slate-800 flex flex-col justify-center
     hover:scale-105 duration-1000 shadow-[0px_0px_20px_-10px_rgba(0,0,0,1)] group
     hover:shadow-[0px_0px_25px_-5px_rgba(0,0,0,1)]
    ">
      <div className="flex  items-center relative">
        {data?.icon.url &&( 
          <>
           <Image
              src={data?.icon?.url}
              alt={data?.icon?.alt}
              width={40}
              height={40}
              className="
              group-hover:animate-bounce
              duration-500
              "
          />
          </>
        )}
        <span 
        style={{color: data?.font.colors.text, fontWeight: data?.font.weight }}
        className={`
        md:text-2xl
        text-lg
        absolute 
        w-full 
        text-center
        uppercase
        opacity-100
        ${data?.number && ( 'group-hover:opacity-0' )}
        duration-500
        ${data?.icon.url && 'ml-2'}
        `}>
          {data?.title}
          </span>
          {data?.number && (
            <span 
              style={{color: data?.font.colors.text, fontSize: data?.font.size, fontWeight: data?.font.weight }}
              className={`
              md:text-2xl
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