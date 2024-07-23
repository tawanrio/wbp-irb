/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import SectionTitle from '@/components/SectionTitle'
import BlogCard from './BlogCard'

const BlogCarousel = ({ posts }) => {
  const blogs = [
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 1',
      description: 'Descrição breve do blog 1.',
      link: '/blog/1',
    },
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 2',
      description: 'Descrição breve do blog 2.',
      link: '/blog/2',
    },
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 3',
      description: 'Descrição breve do blog 3.',
      link: '/blog/3',
    },
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 4',
      description: 'Descrição breve do blog 4.',
      link: '/blog/4',
    },
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 5',
      description: 'Descrição breve do blog 5.',
      link: '/blog/5',
    },
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 6',
      description: 'Descrição breve do blog 6.',
      link: '/blog/6',
    },
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 7',
      description: 'Descrição breve do blog 7.',
      link: '/blog/7',
    },
    {
      image: '/images/partners/irbCode.jpeg',
      title: 'Blog 8',
      description: 'Descrição breve do blog 8.',
      link: '/blog/8',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const cardWidth = 350 // Largura fixa do card
  const gap = 16 // Espaço entre os cards
  const visibleCards = 4 // Número de cards visíveis ao mesmo tempo

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
    <section className="flex flex-col items-center" id="blog-carousel">
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14">
        <SectionTitle title="Acompanhe nossas últimas postagens" line />

        <div className="relative w-full overflow-hidden">
          <div
            className="flex py-5 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
            }}
          >
            {posts.map((post, index) => (
              <div
                key={index}
                className="w-72 flex-shrink-0 overflow-hidden rounded-md duration-500 hover:scale-105"
                style={{ width: `${cardWidth}px`, marginRight: `${gap}px` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
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
      </div>
    </section>
  )
}

export default BlogCarousel
