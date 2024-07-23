import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

import { formatStrToUrl } from '@/utils/functions'
export default function Card({ collection }) {
  const router = useRouter()
  const baseUrl = router.asPath.split('/')

  function generateProductUrl(baseUrl, name) {
    // let productName = name.toLowerCase().trim().replaceAll(' ','-');
    // baseUrl = baseUrl ? baseUrl+'/' : '/';

    return `/${baseUrl[1]}/${name}`
  }

  const collectionUrl = generateProductUrl(
    baseUrl,
    formatStrToUrl(collection.title),
  )
  return (
    <Link
      href={collectionUrl}
      className="flex h-full w-full flex-col items-center duration-500 hover:scale-95"
    >
      <h3 className="text-xl font-medium capitalize">{collection?.title}</h3>
      <div className="flex h-full w-full items-center justify-center rounded-lg border">
        <div className="relative h-full w-1/2">
          <Image
            src={collection?.thumbnail.imageUrl}
            fill
            quality={80}
            alt={collection?.thumbnail.title || 'imagem do produto'}
            sizes="100vw"
          />
        </div>
      </div>
    </Link>
  )
}
