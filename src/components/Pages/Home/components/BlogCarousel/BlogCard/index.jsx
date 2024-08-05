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
    <Link
      href={`blog/${formattedTitle}`}
      className="flex flex-col items-start justify-start overflow-hidden bg-white"
    >
      <figure className="relative h-52 w-full">
        <img
          src={imageUrl}
          alt={post?.image?.alt}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="flex flex-grow flex-col items-start justify-between p-4">
        <h2 className="line-clamp-2 h-14 text-xl font-semibold text-[#222]">
          {post?.title?.rendered}
        </h2>
        <p
          className="line-clamp-5 h-[8.5rem] text-[#222]"
          dangerouslySetInnerHTML={{ __html: sanitizedExcerpt }}
        />
        <p className="m-0 font-semibold text-black hover:underline">
          Saiba mais
        </p>
      </div>
    </Link>
  )
}
