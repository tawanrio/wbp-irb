import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Link from "next/link"

export default function Parceiros({title, partners, colors, hiddenTitle, product, category}) {
    // console.log("product",product);
    // console.log("partners",partners);
    const generatePartnerUrlByProduct = ({product, partner, category}) =>{
        if(category) return `/${partner}/${category}`;
        return `/${partner}/${product}`;
    }
    return (
        <section className="flex flex-col items-center " id={`partners_`}>
            <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6  flex flex-col justify-between md:gap-10 ">
            <SectionTitle title={'Encontre seu parceiro'} line/>
            <div className="
            md:my-2
            flex
            md:gap-8
            gap-5
            justify-between
            flex-wrap
            my-10
            ">

            {partners?.map((partner, pId)=>(
                <Link key={pId} 
                href={generatePartnerUrlByProduct({
                    partner:partner?.label,
                     product:product?.label,
                     category:category ? product?.category : null,
                    } )}
                className="
                flex
                grayscale-[100%]
                flex-1
                md:min-w-[20%]
                min-w-[40%]
                duration-500
                relative
                rounded-3xl
                h-32
                items-center
                hover:grayscale-[0%]
                justify-center
                overflow-hidden
                hover:scale-105
                group
                before:content-['']
                before:block
                before:absolute
                before:bg-[#0a0a0aa3]
                before:z-[2]
                before:w-full
                before:h-full
                "><div>

               
                    <Image
                    fill
                    sizes="100vw"
                    src={partner.bgImage}
                    alt={partner.title}
                    className="
                    object-cover
                    h-[120%]
                    group-hover:h-[100%]
                    duration-700
                    "
                    />
                     </div>
                    <div
                    style={{color: colors.text || '#fff', textShadow: colors.border || '2px 2px 1px #000'}}
                    className="
                    md:text-2xl
                    text-sm
                    absolute
                    w-2/3
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