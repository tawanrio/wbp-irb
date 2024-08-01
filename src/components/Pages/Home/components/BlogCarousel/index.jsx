import React, { useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import { BlogCard } from './BlogCard'

export const BlogCarousel = ({ posts }) => {
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
      className="mx-auto my-4 flex w-full max-w-7xl flex-col items-center justify-between px-6 md:my-7 md:gap-10 md:px-14"
    >
      <SectionTitle
        title="Acompanhe nossas últimas postagens"
        line
        className="w-full"
      />

      <div className="relative w-full overflow-hidden">
        <ul
          className="flex gap-4 py-5 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
          }}
        >
          {posts.map((post, index) => (
            <li
              key={index}
              className="w-[21.875rem] flex-shrink-0 overflow-hidden rounded-md duration-500 hover:scale-105"
            >
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
        {posts.length > visibleCards && (
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
