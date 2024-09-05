import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export const Product = ({ category, className }) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-start overflow-hidden rounded-3xl border border-solid border-[#FFFFFF4D] bg-[#D9D9D91A] px-7 pb-7 pt-3',
        className,
      )}
    >
      <figure className="h-[395.9px] w-full">
        <Image
          src={category.thumbnail.imageUrlPng}
          alt={category.thumbnail.alt}
          width={361.2}
          height={395.9}
          className="h-full w-full rounded-3xl object-cover text-white"
        />
      </figure>
      <section className="flex flex-col items-start justify-between px-2 pt-6">
        <h3 className="line-clamp-1 text-4xl font-extrabold text-white">
          {category.title}
        </h3>
        <p className="m-0 mt-1.5 line-clamp-3 text-lg font-thin text-white">
          {category.contentDescription[0]}
        </p>
        <Link
          href={`/${category.label}`}
          className="m-0 mt-8 rounded-full bg-[#C12025] px-5 py-1 font-thin text-white transition-all duration-200 hover:scale-95"
        >
          Ver mais
        </Link>
      </section>
    </div>
  )
}
