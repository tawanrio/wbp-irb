import Image from "next/image"
import Link from "next/link"

export default function ProductsCard({products, cards, textSize, baseUrl, limit}) {

  const limitCard = limit || 6
  
  function generateProductUrl(baseUrl, product){
    let productName = product.toLowerCase().trim().replaceAll(' ','-');
    baseUrl = baseUrl ? baseUrl : '/';

    return baseUrl + productName
  }
  
  return (
    <div className="
            flex
            md:gap-8
            gap-3
            flex-wrap
            justify-between
            ">

            {cards?.map((product, pId)=>(
              pId <= limitCard-1 &&
                <Link key={pId} 
                href={generateProductUrl(baseUrl,product.title)}
                className="
                flex
                grayscale-[50%]
                flex-1
                md:min-w-[25%]
                min-w-[48%]
                w-full
                py-5
                max-w-[30%]
                rounded-[90px_25px_90px_25px]
                bg-cover
                bg-center
                items-center
                shadow-[0px_0px_40px_-10px_rgba(0,0,0,1)]
                hover:shadow-[0px_0px_30px_3px_rgba(0,0,0,1)]
                hover:grayscale-[0%]
                justify-center
                overflow-hidden
                duration-500
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
                    width={400}
                    height={500}
                    src={product.thumbnail.imageUrl}
                    alt={product.title}
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
                    style={{ color: products?.colors.text || '#fff', textShadow: products?.colors.border || '2px 2px 1px #000'}}
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
                    `}>{product.title}</div>                    
                </Link>
            ))}
            </div>
  )
}