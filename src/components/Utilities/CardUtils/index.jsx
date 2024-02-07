import Image from "next/image"
import Link from "next/link"

export default function CardUtils({content}) {
  return (
    <div
    className="
    flex
    flex-1
    flex-col
    md:min-w-[45%]
    min-w-[40%]
    duration-500
    
    relative
    rounded-3xl
    min-h-[250px]
    items-center
    
    justify-center
    overflow-hidden
    
  
    ">
<h2 className="text-xl font-bold text-[#666] ">Cursos IRB Engraxamente (EAD)</h2>
        <div
    className="
    flex
                grayscale-[50%]
                flex-1
                min-w-[90%]
                py-10
                duration-500
                
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
                before:bg-[#0a0a0ad8]
                before:z-[2]
                before:w-full
                before:h-full
                flex-col
    ">

    <Image
    fill
    sizes="100vw"
    src={"/images/partners/engraxamente.jpeg"}
    alt={'sda'}
    className="
    object-cover
    h-[100%]
    "
    />
    <div className="z-50 flex flex-col text-center items-center gap-4 px-10 text-white">

    
    <span className="text-justify line-clamp-3">EngraxaMente é a plataforma de cursos online e gratuitos desenvolvida pela IRB Automotive. Em comemoração aos seus dois anos no ar, lançamos um novo curso sobre Mecânica Automotiva Básica P1.
Cresça profissionalmente, agregue valor ao seu negócio!

Seja especialista com a gente, plante uma semente, EngraxaMente!</span>
<Link
href={""}
 className="


cursor-pointer
w-1/2
duration-500
hover:scale-105
hover:bg-[rgb(193, 32, 37)]
py-2 
rounded-3xl 
border 
border-white
">Saiba mais</Link>
</div>
     </div>
    </div>
  )
}
