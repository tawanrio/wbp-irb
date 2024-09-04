import React, { useState } from 'react'
import { BlogCard } from './BlogCard'
import { LinkRed } from '@/components/LinkRed'

export const BlogCarousel = ({ posts }) => {
  const currentPosts = posts.slice(0, 3)
  const [currentIndex, setCurrentIndex] = useState(0)

  const cardWidth = 350
  const gap = 16
  const visibleCards = 4

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      if (newIndex < 0) {
        return posts.length - visibleCards
      }
      return newIndex
    })
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      if (newIndex >= posts.length - visibleCards + 2) {
        return 0
      }
      return newIndex
    })
  }

  return (
    <section
      id="blog-carousel"
      className="mx-auto my-4 flex w-full max-w-7xl flex-col items-center justify-between px-6 md:my-32 md:gap-10 md:px-14"
    >
      <LinkRed
        href=""
        className="w-full uppercase !shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)]"
      >
        Últimas notícias
      </LinkRed>

      <div className="relative w-full overflow-hidden">
        <ul
          className="flex gap-10 py-5 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
          }}
        >
          {currentPosts.map((post, index) => (
            <li
              key={index}
              className="w-[21.875rem] flex-shrink-0 overflow-hidden rounded-md"
            >
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
        {currentPosts.length > visibleCards && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-[#22326e] p-3 text-white opacity-70 shadow-md duration-500 hover:bg-[#999] hover:opacity-100"
            >
              {'<'}
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-[#22326e] p-3 text-white opacity-70 shadow-md duration-500 hover:bg-[#999] hover:opacity-100"
            >
              {'>'}
            </button>
          </>
        )}
      </div>
    </section>
  )
}
