/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
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
    formatStrToUrl(collection.tradingName),
  )
  console.log(collectionUrl)
  return (
    // <Link href={collectionUrl} className=' w-full h-full   flex  items-center flex-col hover:scale-95 duration-500'>
    //     <h3 className='capitalize font-medium text-xl'>{collection?.name}</h3>
    //     <div className='w-full border flex justify-center items-center rounded-lg h-full'>
    //     <div className='w-1/2 h-full relative  '>
    //         <Image
    //         src={collection?.gallery.find(image => !image.thumbnail).url}
    //         fill
    //         quality={80}
    //         alt={collection?.gallery.find(image => !image.thumbnail).alt ||'aa'}
    //         sizes='100vw'
    //         />
    //     </div>
    //     </div>
    // </Link>
    <Link
      href={collectionUrl}
      className="flex h-full w-full flex-col items-center duration-500 hover:scale-95"
    >
      <h3 className="flex h-16 flex-grow items-center text-xl font-bold capitalize">
        {collection?.tradingName}
      </h3>

      {/* <h3 className='capitalize font-bold text-xl flex flex-grow items-center h-16'>{collection?.tradingName}</h3> */}
      <div className="flex h-[220px] w-full items-center justify-center rounded-lg border">
        <div className="relative h-full w-full">
          {/* <Image
          src={collection?.gallery.find(image => !image.thumbnail).url}
          fill
          quality={80}
          alt={collection?.gallery.find(image => !image.thumbnail).alt ||'Imagem'}
          sizes='100%'
          className='object-cover !h-full m-auto'
          /> */}
          <img
            src={collection?.logo.url}
            alt={collection?.logo.alt}
            className="m-auto !h-full object-fill"
          />
        </div>
      </div>
    </Link>
  )
}
