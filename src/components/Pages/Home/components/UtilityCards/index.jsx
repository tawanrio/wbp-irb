import React, { useState, useEffect } from 'react'
import SingleUtility from './SingleUtility'
import { UTILITY_CARDS } from '@/utils/constants'

const UtilityCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      handleResize()
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) %
        (isMobile ? UTILITY_CARDS.length : UTILITY_CARDS.length - 1),
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      if (newIndex < 0) {
        return UTILITY_CARDS.length - 2
      }
      return newIndex
    })
  }

  return (
    <section
      id="blog-carousel"
      className="relative mt-14 flex flex-col items-center"
    >
      <div className="relative my-4 flex w-full max-w-[1540px] flex-col px-6 md:mb-0 md:px-14">
        <div className="py-15 container mx-auto my-5">
          <div className="relative flex overflow-hidden py-4">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform bg-[#22326e] p-3 text-center font-semibold text-white opacity-70 duration-500 hover:border-white hover:bg-[#22326e] hover:text-white hover:opacity-100"
            >
              {'<'}
            </button>
            <ul
              className="flex gap-4 transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? '25' : '50')}%)`,
              }}
            >
              {UTILITY_CARDS.map((utilities, index) => (
                <li
                  key={index}
                  className="w-[700px] flex-shrink-0 rounded-md duration-500"
                >
                  <SingleUtility utilities={utilities} />
                </li>
              ))}
            </ul>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform bg-[#22326e] p-3 text-center font-semibold text-white opacity-70 duration-500 hover:border-white hover:bg-[#22326e] hover:text-white hover:opacity-100"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UtilityCards
