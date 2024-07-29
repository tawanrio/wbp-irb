/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import SectionTitle from '@/components/SectionTitle'
import SingleUtility from './SingleUtility'

const UtilityCards = ({ utilityCards }) => {
  const cards = utilityCards.cards
  const title = utilityCards.title

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
        (prevIndex + 1) % (isMobile ? cards.length : cards.length - 1),
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      if (newIndex < 0) {
        return cards.length - 2 // Voltar para o último card ao chegar ao início
      }
      return newIndex
    })
  }

  return (
    <section
      className="relative mt-14 flex flex-col items-center"
      id="blog-carousel"
    >
      <div className="relative my-4 flex w-full max-w-lg flex-col px-6 md:mb-0 md:max-w-7xl md:px-14">
        <SectionTitle title={title} line />
        <div className="container mx-auto my-5 py-10">
          <div className="relative flex overflow-hidden">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform bg-[#22326e] p-3 text-center font-semibold text-white opacity-70 duration-500 hover:border-white hover:bg-[#22326e] hover:text-white hover:opacity-100"
            >
              {'<'}
            </button>
            <div
              className="flex gap-5 transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? '25' : '50')}%)`,
              }}
            >
              {cards.map((utilities, index) => (
                <div
                  key={index}
                  className="w-[80vw] flex-shrink-0 overflow-hidden rounded-md duration-500 hover:scale-95 md:w-[48%]"
                  style={{ marginRight: '8px' }} // Assuming gap is 8px
                >
                  <SingleUtility utilities={utilities} />
                </div>
              ))}
            </div>
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
