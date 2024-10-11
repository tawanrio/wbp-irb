import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { useIntl } from 'react-intl'

export const Product = ({ category, className }) => {
  const intl = useIntl()
  const messages = intl.messages

  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-start overflow-hidden rounded-3xl border border-solid bg-[#D9D9D91A] px-7 pb-7 pt-3',
        className,
      )}
    >
      <figure className="h-full max-h-[395.9px] w-full">
        <Image
          src={category.thumbnail.imageUrlPng}
          alt={category.thumbnail.alt}
          width={361.2}
          height={395.9}
          className="h-full max-h-[395.9px] w-full rounded-3xl"
        />
      </figure>
      <section className="flex flex-col items-start justify-between px-2 pt-6">
        <h3 className="mb-1.5 line-clamp-2 text-2xl font-extrabold max-sm:break-all xl:text-4xl">
          {category.title}
        </h3>
        <p className="m-0 mt-1.5 line-clamp-3 font-thin xl:text-lg">
          {category.contentDescription[0]}
        </p>
        <div className="mt-8 flex w-full justify-end">
          <Link
            href={`/${category.label}`}
            className="m-0 rounded-full bg-[#982225] px-5 py-1.5 font-thin !text-white transition-all duration-200 hover:scale-95"
          >
            {messages['component.home.product.seemore']}
          </Link>
        </div>
      </section>
    </div>
  )
}
