/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatStrToUrl, generateProductUrl } from '@/utils/functions'
import imageNotFound from '../../../../public/images/components/others/image-not-found.jpg'

export default function Card({ collection }) {
  const router = useRouter()
  const baseUrl = router.asPath.split('/')

  const collectionUrl = generateProductUrl(
    baseUrl,
    formatStrToUrl(collection.tradingName),
  )

  return (
    <Link
      href={collectionUrl}
      className="mx-auto flex h-full w-full max-w-[22.5rem] flex-col items-center space-y-2 duration-500 hover:scale-95"
    >
      <h3 className="flex h-14 items-center text-center text-lg font-bold uppercase">
        {collection?.tradingName}
      </h3>
      <figure className="flex h-[13.75rem] w-full items-center justify-center overflow-hidden rounded-lg border">
        <img
          src={imageNotFound.src}
          alt={`Imagem ${collection.companyName}`}
          className="h-full w-full object-cover"
        />
      </figure>
    </Link>
  )
}
