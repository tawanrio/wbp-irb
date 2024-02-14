import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Link from "next/link"

export default function PartnersType({title, partners, colors}) {
    return (
        <section className="flex flex-col items-center " id={`partners_`}>
            <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6  flex flex-col justify-between md:gap-10 ">
            <div className="
            md:my-2
            flex
            md:gap-20
            gap-5
            justify-center
            flex-col
            flex-wrap
            my-10
            ">

            {partners.types?.map((partner, pId)=>{
                if(partner.label != 'fabrica')return(
                <div  key={pId}>
                <div
                    className="
                    md:text-3xl
                    text-sm
                    md:mb-2
                    w-full
                    group-hover:scale-[1.10]
                    duration-700
                    text-end
                    uppercase
                    font-bold
                    z-10
                    ">{partner.title}</div> 
                <Link
                href={'/'+partner.label}
                className="
                flex
                grayscale-[80%]
                w-full
                duration-500
                
                relative
                rounded-[90px_25px_90px_25px]
                h-[300px]
                items-center
                shadow-[0px_0px_40px_-10px_rgba(0,0,0,1)]
                hover:shadow-[0px_0px_30px_3px_rgba(0,0,0,1)]
                hover:grayscale-[0%]
                justify-center
                overflow-hidden
                group


                before:content-['']
                before:block
                before:absolute
                before:bg-[#0a0a0a98]
                before:z-[2]
                before:w-full
                before:h-full
                ">
                    <Image
                    fill
                    sizes="100vw"
                    src={partner.bgImage}
                    alt={partner.title}
                    className="
                    object-cover
                 
                    duration-700
                    "
                    />
                                     
                </Link>
                </div>
            )}
            )}
            </div>
            </div>
        </section>
    )
}