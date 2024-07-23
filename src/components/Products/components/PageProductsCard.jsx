import Image from 'next/image'
import Link from 'next/link'

export default function ProductsCard({
  products,
  colors,
  textSize,
  baseUrl,
  limit,
}) {
  const limitCard = limit || 6

  function generateProductUrl(baseUrl, product) {
    const productName = product.toLowerCase().trim().replaceAll(' ', '-')
    baseUrl = baseUrl || '/'
    const url = baseUrl + productName
    return url
  }

  return (
    <div className="flex w-full flex-wrap justify-between gap-3 md:gap-8">
      {products?.map(
        (product, pId) =>
          pId <= limitCard - 1 && (
            <Link
              key={pId}
              href={generateProductUrl(baseUrl, product.title)}
              className="group relative flex w-1/3 min-w-[48%] max-w-[30%] flex-1 items-end justify-center overflow-hidden rounded-[90px_25px_90px_25px] bg-cover bg-center py-5 shadow-[0px_0px_40px_-10px_rgba(0,0,0,1)] grayscale-[80%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0ab4] before:content-[''] hover:scale-105 hover:shadow-[0px_0px_30px_3px_rgba(0,0,0,1)] hover:grayscale-[0%] md:h-80 md:min-w-[25%]"
            >
              <Image
                sizes="100%"
                fill
                src={product.thumbnail.imageUrl}
                alt={product.title}
                className={`h-[250%] object-cover duration-700 group-hover:h-[191%] md:h-[200%] md:group-hover:h-[170%]`}
              />
              <div
                style={{
                  color: colors?.text || '#fff',
                  textShadow: colors?.border || '2px 2px 1px #000',
                }}
                className={`absolute ${textSize} z-10 w-3/4 text-center text-base font-medium uppercase duration-700 md:group-hover:scale-[1.10]`}
              >
                {product.title}
              </div>
            </Link>
          ),
      )}
    </div>
  )
}
