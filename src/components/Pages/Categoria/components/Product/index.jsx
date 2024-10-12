import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { useIntl } from 'react-intl'

export const Product = ({ product, className, thumbnail }) => {
  const [htmlContent, setHtmlContent] = useState('')

  const {
    thumbnail: thumbnailProduct,
    title,
    contentDescription,
    label,
  } = product

  const intl = useIntl()
  const messages = intl.messages

  useEffect(() => {
    setHtmlContent(contentDescription)
  }, [contentDescription])

  return (
    <div
      suppressHydrationWarning
      className={cn(
        'flex w-full flex-col items-start justify-start overflow-hidden rounded-3xl border border-solid border-[#0000004D] bg-[#D9D9D91A] px-7 pb-7 pt-3',
        className,
      )}
    >
      <figure className="h-full max-h-[395.9px] w-full">
        <Image
          src={thumbnailProduct.url || thumbnail.imageUrlPng}
          alt={thumbnailProduct.alt}
          width={361.2}
          height={395.9}
          className="h-full max-h-[395.9px] w-full rounded-3xl"
        />
      </figure>
      <section className="flex w-full flex-col items-start justify-between px-2 pt-6">
        <h3 className="mb-1.5 line-clamp-2 text-2xl font-extrabold max-sm:break-all xl:text-4xl">
          {title}
        </h3>
        <p
          className="line-clamp-4 font-thin xl:text-lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <div className="mt-8 flex w-full justify-end">
          <Link
            href={`/${label}`}
            className="m-0 rounded-full bg-[#982225] px-5 py-1.5 font-thin !text-white transition-all duration-200 hover:scale-95"
          >
            {messages['component.home.product.seemore']}
          </Link>
        </div>
      </section>
    </div>
  )
}
