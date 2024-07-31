/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export const BlogCard = ({ post }) => {
  const getUrlImage = (post) => {
    let urlImageDest = '/images/components/others/not-found.jpg'
    if (post?.yoast_head_json?.og_image) {
      urlImageDest = post?.yoast_head_json.og_image[0]?.url
    }
    return urlImageDest
  }

  const formattedTitle = post?.title?.rendered
    .split(' ')
    .join('-')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  return (
    <Link
      href={`blog/${formattedTitle}`}
      className="flex flex-col items-start justify-start overflow-hidden bg-white"
    >
      <figure className="relative h-52 w-full">
        <img
          src={getUrlImage(post)}
          alt={post?.image?.alt}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="flex flex-grow flex-col items-start justify-between p-4">
        <h2 className="line-clamp-2 h-14 text-xl font-semibold text-[#222]">
          {post?.title?.rendered}
        </h2>
        <p
          className="line-clamp-5 text-[#222]"
          dangerouslySetInnerHTML={{ __html: post?.excerpt?.rendered }}
        />
        <p className="m-0 text-center font-semibold text-black transition-colors duration-500">
          Saiba mais
        </p>
      </div>
    </Link>
  )
}
