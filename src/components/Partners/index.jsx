import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Link from "next/link"

export default function Parceiros({title, partners, colors}) {
    return (
        <section className="flex flex-col items-center " id={`partners_`}>
            <div className="w-full max-w-7xl md:px-14 md:my-10 my-4 px-6  flex flex-col justify-between md:gap-10 ">
            <SectionTitle title={title} line/>
            <div className="
            md:my-6
            flex
            md:gap-8
            gap-5
            justify-center
            flex-wrap
            my-10
            ">

            {partners?.map((partner, pId)=>(
                <Link key={pId} 
                href={'/'+partner.category}
                className="
                flex
                grayscale-[50%]
                flex-1
                md:min-w-[20%]
                min-w-[40%]
                duration-500
                
                relative
                rounded-3xl
                h-40
                items-center
                shadow-[0px_0px_40px_-10px_rgba(0,0,0,1)]
                hover:shadow-[0px_0px_30px_3px_rgba(0,0,0,1)]
                hover:grayscale-[0%]
                justify-center
                overflow-hidden
                hover:scale-105
                group
                before:content-['']
                before:block
                before:absolute
                before:bg-[#0a0a0a3a]
                before:z-[2]
                before:w-full
                before:h-full
                ">
                    <Image
                    width={300}
                    height={400}
                    src={partner.bgImage}
                    alt={partner.title}
                    className="
                    object-cover
                    h-[120%]
                    group-hover:h-[100%]
                    duration-700
                    "
                    />
                    <div
                    style={{color: colors.text || '#fff', textShadow: colors.border || '2px 2px 1px #000'}}
                    className="
                    md:text-2xl
                    text-sm
                    absolute
                    w-full
                    group-hover:scale-[1.10]
                    duration-700
                    text-center
                    uppercase
                    font-medium
                    z-10
                    ">{partner.title}</div>                    
                </Link>
            ))}
            </div>
            </div>
        </section>
    )
}