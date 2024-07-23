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
      className="flex h-full w-full flex-col items-center duration-500 hover:scale-95"
    >
      <h3 className="flex h-16 flex-grow items-center text-xl font-bold capitalize">
        {collection?.tradingName}
      </h3>
      <figure className="flex h-[13.75rem] w-full items-center justify-center overflow-hidden rounded-lg border">
        <img
          src={imageNotFound.src}
          alt={collection?.logo.alt}
          className="h-full w-full object-cover"
        />
      </figure>
    </Link>
  )
}
