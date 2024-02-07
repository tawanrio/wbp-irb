import Image from "next/image"
import Link from "next/link"

export default function ProductsCard({colors, categories, textSize, baseUrl, limit, heightCard,baseUrlGeo}) {

  const limitCard = limit || 6
  
  function generateProductUrl({baseUrl,baseUrlGeo, category}){
    let productName = category.toLowerCase().trim().replaceAll(' ','-');
    baseUrl = baseUrl ? baseUrl : '/';
    
    if(baseUrlGeo){
      const arrRoute = baseUrlGeo.replace('/','').split('/')
      return `/${arrRoute[0]}/${productName}/${arrRoute[1]}`
    }
    return baseUrl + productName
  }
  
  
  return (
    <div className="
            flex
            md:gap-8
            gap-3
            flex-wrap
            justify-between
            w-full
            ">

            {categories?.map((category, pId)=>(
              pId <= limitCard-1 &&
                <Link key={pId} 
                href={generateProductUrl({baseUrl:baseUrl,baseUrlGeo: baseUrlGeo ,category:category.label})}
                className={`
                flex
                grayscale-[100%]
                flex-1
                md:min-w-[25%]
                min-w-[48%]
                w-full
                md:h-[135px]
                h-[100px]
                py-5
                max-w-[30%]
                md:rounded-[90px_25px_90px_25px]
                rounded-[60px_25px_60px_25px]
                bg-cover
                bg-center
                items-center
               
                hover:grayscale-[0%]
                justify-center
                overflow-hidden
                duration-500
                hover:scale-105
                group
                
                before:content-['']
                before:block
                before:absolute
                before:bg-[#0a0a0aa3]
                before:z-[2]
                before:w-full
                before:h-full
                ${heightCard && heightCard}
                `}>

                    
                     <Image
                    fill
                    sizes="100vw"
                    src={category.thumbnail.imageUrl}
                    alt={category.title}
                    className={`
                    md:h-[200%]
                    md:group-hover:h-[170%]
                    h-[250%]
                    group-hover:h-[191%]
                    
                    object-cover
                    duration-700
                    `}
                    />
                    <div
                    style={{ color: colors?.text || '#fff', textShadow: '2px 2px 1px #000'}}
                    className={`
                    absolute
                    ${textSize}
                    text-base
                    md:group-hover:scale-[1.10]
                    duration-700
                    text-center
                    uppercase
                    w-3/4
                    font-medium
                    z-10
                    `}>{category.title}</div>                    
                </Link>
            ))}
            </div>
  )
}