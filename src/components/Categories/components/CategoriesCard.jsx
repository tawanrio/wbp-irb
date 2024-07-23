import Image from 'next/image'
import Link from 'next/link'

export default function ProductsCard({
  colors,
  categories,
  textSize,
  baseUrl,
  limit,
  heightCard,
  baseUrlGeo,
}) {
  const limitCard = limit || 6

  function generateProductUrl({ baseUrl, baseUrlGeo, category }) {
    const productName = category.toLowerCase().trim().replaceAll(' ', '-')
    baseUrl = baseUrl || '/'

    if (baseUrlGeo) {
      const arrRoute = baseUrlGeo.replace('/', '').split('/')
      return `/${arrRoute[0]}/${productName}/${arrRoute[1]}`
    }
    return baseUrl + productName
  }

  return (
    <div className="flex w-full flex-wrap justify-between gap-3 md:gap-8">
      {categories?.map(
        (category, pId) =>
          pId <= limitCard - 1 && (
            <Link
              key={pId}
              href={generateProductUrl({
                baseUrl,
                baseUrlGeo,
                category: category.label,
              })}
              className={`group flex h-[100px] w-full min-w-[48%] max-w-[30%] flex-1 items-center justify-center overflow-hidden rounded-[60px_25px_60px_25px] bg-cover bg-center py-5 grayscale-[80%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0ab4] before:content-[''] hover:scale-105 md:h-[135px] md:min-w-[25%] md:rounded-[90px_25px_90px_25px] ${heightCard && heightCard} `}
            >
              <Image
                fill
                sizes="100vw"
                src={category.thumbnail.imageUrl}
                alt={category.title}
                className={`h-[250%] object-cover duration-700 group-hover:h-[191%] md:h-[200%] md:group-hover:h-[170%]`}
              />
              <div
                style={{
                  color: colors?.text || '#fff',
                  textShadow: '2px 2px 1px #000',
                }}
                className={`absolute ${textSize} z-10 w-3/4 text-center text-base font-medium uppercase duration-700 md:group-hover:scale-[1.10]`}
              >
                {category.title}
              </div>
            </Link>
          ),
      )}
    </div>
  )
}
