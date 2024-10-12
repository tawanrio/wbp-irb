import { useEffect, useState } from 'react'
import Image from 'next/image'

export const ProductDescription = ({ product }) => {
  const [htmlContent, setHtmlContent] = useState('')

  const { thumbnail, contentDescription, title } = product || {}

  useEffect(() => {
    setHtmlContent(contentDescription)
  }, [contentDescription])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-start gap-8 overflow-hidden rounded-3xl border border-solid border-[#FFFFFF30] bg-[#D9D9D91A] p-7 md:max-w-4xl md:flex-row">
      <figure className="h-full max-h-[395.9px] max-w-full">
        <Image
          src={thumbnail.url}
          alt={thumbnail.alt}
          width={361.2}
          height={395.9}
          className="h-full max-h-[395.9px] w-full rounded-3xl text-white"
        />
      </figure>
      <div className="mt-2 flex w-full max-w-md flex-col gap-7 overflow-auto overflow-x-hidden">
        <h1 className="mb-1.5 line-clamp-2 text-2xl font-extrabold text-white max-sm:break-all sm:text-3xl">
          {title}
        </h1>
        <p
          className="custom-strong max-h-[450px] space-y-1 overflow-y-auto overflow-x-hidden font-thin text-white xl:text-lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
}
