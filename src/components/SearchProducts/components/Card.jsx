import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import  {useRouter}  from 'next/router';

import {formatStrToUrl} from '@/utils/functions'
export default function Card({collection}) {
    const router = useRouter()
    const baseUrl = router.asPath.split('/')

    function generateProductUrl(baseUrl, name){
        // let productName = name.toLowerCase().trim().replaceAll(' ','-');
        // baseUrl = baseUrl ? baseUrl+'/' : '/';
    
        return (`/${baseUrl[1]}/${name}`)
      }

      const collectionUrl = generateProductUrl(baseUrl,formatStrToUrl(collection.title))
  return (
    <Link href={collectionUrl} className=' w-full h-full   flex  items-center flex-col hover:scale-95 duration-500'>
        <h3 className='capitalize font-medium text-xl'>{collection?.title}</h3>
        <div className='w-full border flex justify-center items-center rounded-lg h-full'>
        <div className='w-1/2 h-full relative  '>
            <Image 
            src={collection?.thumbnail.imageUrl}
            fill
            quality={80}
            alt={collection?.thumbnail.title ||'imagem do produto'}
            sizes='100vw'
            />
        </div>
        </div>
    </Link>
  )
}
