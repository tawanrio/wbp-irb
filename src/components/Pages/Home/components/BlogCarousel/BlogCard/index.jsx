/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'

const BlogCard = ({ post }) => {
  const getUrlImage = (post) => {
    let urlImageDest = '/images/components/others/not-found.jpg'
    if (post?.yoast_head_json?.og_image) {
      urlImageDest = post?.yoast_head_json.og_image[0]?.url
    }
    return urlImageDest
  }

  return (
    <div className="flex flex-col items-start justify-start overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative h-52 w-full">
        <img
          src={getUrlImage(post)}
          alt={post.image?.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-grow flex-col items-start justify-between p-4">
        {' '}
        {/* Usando flex-grow para garantir que este div ocupe o espaço restante */}
        <div>
          <h2 className="line-clamp-2 h-14 text-xl font-semibold text-[#222] md:h-16">
            {post?.title.rendered}
          </h2>
          <p
            className="line-clamp-5 text-[#222]"
            dangerouslySetInnerHTML={{ __html: post?.excerpt.rendered }}
          ></p>
        </div>
        <div>
          <a
            href={'blog/' + post.id}
            className="inline-block rounded-md text-center font-semibold text-black transition-colors duration-500"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
