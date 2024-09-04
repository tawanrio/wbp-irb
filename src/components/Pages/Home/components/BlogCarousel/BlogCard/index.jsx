/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sanitizeHtml } from '@/utils/functions'

export const BlogCard = ({ post }) => {
  const getUrlImage = (post) => {
    const defaultImage = '/images/components/others/not-found.jpg'
    return post?.yoast_head_json.og_image[0]?.url || defaultImage
  }

  const formatTitle = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(' ')
      .join('-')
      .trim()
  }

  const imageUrl = getUrlImage(post)
  const formattedTitle = formatTitle(post?.title?.rendered)
  const [sanitizedExcerpt, setSanitizedExcerpt] = useState('')

  useEffect(() => {
    if (post?.excerpt?.rendered) {
      setSanitizedExcerpt(sanitizeHtml(post.excerpt.rendered))
    }
  }, [post])

  return (
    <div className="flex flex-col items-start justify-start overflow-hidden">
      <figure className="relative h-[285.96px] w-full">
        <img
          src={imageUrl}
          alt={post?.title?.rendered}
          className="h-full w-full rounded-3xl object-cover"
        />
      </figure>
      <div className="flex flex-grow flex-col items-start justify-between gap-6 px-4 pt-6">
        <h2 className="line-clamp-2 h-14 text-2xl font-black text-[#982225]">
          {post?.title?.rendered}
        </h2>
        <p
          className="line-clamp-4 text-lg font-thin text-[#222]"
          dangerouslySetInnerHTML={{ __html: sanitizedExcerpt }}
        />
        <Link
          href={`blog/${formattedTitle}`}
          className="m-0 rounded-full bg-[#22326E] px-5 py-1 font-extralight text-white transition-all duration-200 hover:scale-95"
        >
          Ler mais
        </Link>
      </div>
    </div>
  )
}
