import Image from "next/image"
import Link from "next/link"

export default function CardUtilsFour({content, blank}) {
  return (
    <div
    className="
    flex
    flex-1
    flex-col
    md:min-w-[45%]
    min-w-[100%]
    md:px-0
    px-6
    duration-500
    gap-4
    relative
    rounded-3xl
    min-h-[250px]
    items-center
    
    justify-center
    overflow-hidden
    
  
    ">
        <h2 className="text-xl font-bold text-[#666] ">{content?.title}</h2>
        <div
    className="
    flex
                grayscale-[50%]
                flex-1
                min-w-[90%]
                py-10
                duration-500
                md:!min-h-[250px]
                relative
                rounded-3xl
                items-center
                
                hover:grayscale-[100%]
                justify-center
                overflow-hidden
                group
                before:content-['']
                before:block
                before:absolute
                before:bg-[#0a0a0acc]
                before:z-[2]
                before:w-full
                before:h-full
                flex-col
    ">

    <Image
    fill
    sizes="100vw"
    src={content?.image}
    alt={'sda'}
    className="
    object-cover
    h-[100%]
    "
    />
    <div className="z-50 flex flex-col text-center items-center gap-4 px-10 text-white">

    
    <span className="text-justify ">{content?.description}</span>

</div>
     </div>
     <Link
   target={blank}
href={content?.link}
 className="


cursor-pointer
w-1/2
mb-2
duration-500
hover:scale-105
py-2 
rounded-3xl 
border 
text-center
border-[#666]
">{content?.linkText}</Link>
    </div>
  )
}
