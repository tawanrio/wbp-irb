import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from '@/lib/utils'
import { sanitizeHtml } from '@/utils/functions'

export const ListBlogs = ({
  posts,
  isLoading,
  setIsLoading,
  currentPage,
  totalPages,
  surtitle,
}) => {
  const route = useRouter()
  const [sanitizedContent, setSanitizedContent] = useState([])

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 1) {
      route.push(`/blog`)
    } else {
      route.push(`/blog?page=${pageNumber}`)
    }
  }

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / 3) * 3
    return new Array(Math.min(3, totalPages - start))
      .fill()
      .map((_, idx) => start + idx + 1)
  }

  useEffect(() => {
    if (posts && posts.length > 0) {
      const sanitized = posts.map((item) => ({
        ...item,
        contentHTML: item.contentHTML ? sanitizeHtml(item.contentHTML) : null,
      }))
      setSanitizedContent(sanitized)
    }
  }, [posts])

  return (
    <section className="flex max-w-6xl flex-col gap-10 px-5 pb-32 pt-12 sm:gap-16 sm:pt-16 md:mx-auto">
      <h2 className="mx-auto w-full max-w-6xl rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-lg font-normal uppercase text-white shadow-[inset_0px_6.21px_5.5px_rgba(0,0,0,0.5)]">
        {surtitle}
      </h2>
      <ul className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {sanitizedContent?.map((post, key) => (
          <li
            key={key}
            className="flex flex-col items-start justify-start overflow-hidden pb-1.5"
          >
            <figure className="relative h-[285.96px] w-full">
              <Image
                src={post.featuredImg.url}
                alt={post.featuredImg.alt}
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
                {post.title}
              </h3>
              <p
                className="line-clamp-4 text-lg font-thin text-[#222]"
                dangerouslySetInnerHTML={{ __html: post.contentHTML }}
              />
              <Link
                href={`blog/${post.permaLink}`}
                className="m-0 rounded-full bg-[#22326E] px-5 py-1 font-extralight text-white shadow-[0px_3.91px_3.91px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95"
              >
                Ler mais
              </Link>
            </section>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        {currentPage > 3 && (
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-1 rounded bg-gray-200 px-3 py-1 text-gray-700"
            >
              &lt;
            </button>
          </div>
        )}
        {getPaginationGroup().map((pageNumber) => (
          <div key={pageNumber}>
            <button
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 rounded px-3 py-1 ${currentPage === pageNumber ? 'bg-[#22326E] text-white shadow-[0px_3.91px_3.91px_rgba(0,0,0,0.25)]' : 'bg-gray-200 text-gray-700'}`}
            >
              {pageNumber}
            </button>
          </div>
        ))}
        {currentPage < totalPages - 3 && (
          <div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-1 rounded bg-gray-200 px-3 py-1 text-gray-700"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
