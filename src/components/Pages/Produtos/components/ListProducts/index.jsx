import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useIntl } from 'react-intl'

export const ListProducts = ({ products, className, classNameLink }) => {
  const intl = useIntl()
  const messages = intl.messages

  return (
    <ul
      className={cn(
        'mx-auto grid w-full max-w-md grid-cols-1 gap-x-10 gap-y-16 px-6 pb-20 pt-5 sm:max-w-7xl sm:grid-cols-2 sm:pb-32 sm:pt-10 lg:grid-cols-3',
        className,
      )}
    >
      {products.map((product, index) => (
        <li
          key={index}
          className={cn(
            'flex w-full flex-col items-start justify-start overflow-hidden rounded-3xl border border-solid bg-[#D9D9D91A] px-7 pb-7 pt-3',
            classNameLink,
          )}
        >
          <figure className="h-full max-h-[395.9px] w-full">
            <Image
              src={product.thumbnail.imageUrlPng}
              alt={product.thumbnail.alt}
              width={361.2}
              height={395.9}
              className="h-full max-h-[395.9px] w-full rounded-3xl"
            />
          </figure>
          <section className="flex flex-col items-start justify-between px-2 pt-6">
            <h3 className="mb-1.5 line-clamp-2 text-2xl font-extrabold max-sm:break-all xl:text-4xl">
              {product.title}
            </h3>
            <p className="m-0 mt-1.5 line-clamp-3 font-thin xl:text-lg">
              {product.contentDescription[0]}
            </p>
            <div className="mt-8 flex w-full justify-end">
              <Link
                href={`/${product.label}`}
                className="m-0 rounded-full bg-[#982225] px-5 py-1.5 font-thin !text-white transition-all duration-200 hover:scale-95"
              >
                {messages['component.product.seeMore']}
              </Link>
            </div>
          </section>
        </li>
      ))}
    </ul>
  )
}
