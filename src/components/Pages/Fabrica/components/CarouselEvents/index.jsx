import { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { resolveImageUrl } from '@/utils/functions'

export const CarouselEvent = ({ events }) => {
  const intl = useIntl()
  const messages = intl.messages

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const { title, subtitle, content } = events || {}

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === 0 ? content.length - 1 : prevIndex - 1
      } else {
        return prevIndex === 0 ? content.length - 3 : prevIndex - 1
      }
    })
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === content.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === content.length - 3 ? 0 : prevIndex + 1
      }
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024)
      }

      handleResize()
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      id="timeline"
      className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 px-6 py-8 md:px-14 md:py-10"
    >
      <h2 className="mx-auto w-full max-w-6xl rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-lg font-normal uppercase text-white shadow-[inset_0px_6.21px_5.5px_rgba(0,0,0,0.5)]">
        {title}
      </h2>
      <p className="mx-auto w-full max-w-6xl pl-6 text-2xl font-extralight sm:text-3xl">
        {subtitle}
      </p>
      <div className="relative w-full overflow-hidden">
        <ul
          className="mx-4 flex gap-7 py-5 transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (isMobile ? 108 : 100 / 3)}%)`,
          }}
        >
          {content.map((event, index) => (
            <li
              key={index}
              className="w-full flex-shrink-0 overflow-hidden rounded-md duration-500 lg:w-[30%]"
            >
              <div
                className="relative h-96 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${resolveImageUrl(event.image)})`,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-between bg-black bg-opacity-70 p-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-white">
                      {event.title}
                    </h3>
                    <p className="text-white">{event.description}</p>
                  </div>
                  <div>
                    {event.date && (
                      <p className="text-white">
                        <span className="font-bold">
                          {messages['component.event.date']}:
                        </span>{' '}
                        {event.date}
                      </p>
                    )}
                    {event.location && (
                      <p className="text-white">
                        <span className="font-bold">
                          {messages['component.event.location']}:
                        </span>{' '}
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {content.length > 3 && (
          <>
            <button
              onClick={prevSlide}
              aria-label={messages['component.event.button.prev']}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-[#22326e] p-3 text-white opacity-70 shadow-md duration-500 hover:bg-[#999] hover:opacity-100"
            >
              {'<'}
            </button>
            <button
              onClick={nextSlide}
              aria-label={messages['component.event.button.next']}
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
