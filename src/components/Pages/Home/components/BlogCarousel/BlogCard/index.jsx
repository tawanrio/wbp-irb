import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatTitle, getUrlImage, sanitizeHtml } from '@/utils/functions'
import { cn } from '@/utils/cn'

export const BlogCard = ({ post }) => {
  const [sanitizedExcerpt, setSanitizedExcerpt] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const imageUrl = getUrlImage(post)
  const formattedTitle = formatTitle(post?.title?.rendered)

  useEffect(() => {
    if (post?.excerpt?.rendered) {
      setSanitizedExcerpt(sanitizeHtml(post.excerpt.rendered))
    }
  }, [post])

  return (
    <div className="flex flex-col items-start justify-start overflow-hidden pb-1.5">
      <figure className="relative h-[285.96px] w-full">
        <Image
          src={imageUrl}
          alt={post?.title?.rendered}
          width={350}
          height={285.96}
          priority
          quality={100}
          onLoad={() => setIsLoading(false)}
          className={cn(
            'h-full w-full rounded-3xl object-cover transition-[scale,filter] duration-700',
            isLoading && 'scale-[1.02] blur-xl grayscale',
          )}
        />
      </figure>
      <section className="flex flex-grow flex-col items-start justify-between gap-6 px-4 pt-6">
        <h3 className="line-clamp-2 text-2xl font-black text-[#982225]">
          {post?.title?.rendered}
        </h3>
        <p
          className="line-clamp-4 text-lg font-thin text-[#222]"
          dangerouslySetInnerHTML={{ __html: sanitizedExcerpt }}
        />
        <Link
          href={`blog/${formattedTitle}`}
          className="m-0 rounded-full bg-[#22326E] px-5 py-1 font-extralight text-white shadow-[0px_3.91px_3.91px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95"
        >
          Ler mais
        </Link>
      </section>
    </div>
  )
}
