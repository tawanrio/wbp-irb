/* eslint-disable @next/next/no-img-element */
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
    <li className="grid w-full grid-cols-1 gap-3 overflow-hidden rounded-[60px_25px_60px_25px] sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:rounded-[90px_25px_90px_25px]">
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
              className={`group flex h-[6.25rem] w-full flex-1 items-center justify-center overflow-hidden rounded-[60px_25px_60px_25px] bg-cover bg-center py-5 grayscale-[80%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0ab4] before:content-[''] md:h-[135px] md:min-w-[25%] md:rounded-[90px_25px_90px_25px] md:hover:scale-105 ${heightCard && heightCard} `}
            >
              <img
                src={category.thumbnail.imageUrl}
                alt={category.title}
                className="h-[250%] object-cover duration-700 md:h-[200%] md:group-hover:h-[170%]"
              />
              <p
                style={{
                  color: colors?.text || '#fff',
                  textShadow: '2px 2px 1px #000',
                }}
                className={`absolute ${textSize} z-10 w-3/4 text-center text-base font-medium uppercase duration-700 md:group-hover:scale-[1.10]`}
              >
                {category.title}
              </p>
            </Link>
          ),
      )}
    </li>
  )
}
