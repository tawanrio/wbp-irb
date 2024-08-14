import { useState, useEffect } from 'react'
import SectionTitle from '@/components/SectionTitle'

const Carousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === 0 ? events.length - 1 : prevIndex - 1
      } else {
        return prevIndex === 0 ? events.length - 3 : prevIndex - 1
      }
    })
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === events.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === events.length - 3 ? 0 : prevIndex + 1
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
      className="mx-auto my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14"
      id="timeline"
    >
      <SectionTitle title="Nossos eventos" line />

      <div className="relative w-full overflow-hidden">
        <div
          className="mx-4 flex gap-7 py-5 transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (isMobile ? 108 : 100 / 3)}%)`,
          }}
        >
          {events.map((item, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 overflow-hidden rounded-md duration-500 hover:scale-95 lg:w-[30%]"
            >
              <div
                className="relative h-96 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 flex flex-col justify-between bg-black bg-opacity-70 p-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-white">{item.description}</p>
                  </div>
                  <div>
                    {item.date && (
                      <p className="text-white">
                        <span className="font-bold">Data:</span> {item.date}
                      </p>
                    )}
                    {item.timeStart && (
                      <p className="text-white">
                        <span className="font-bold">Horário:</span>{' '}
                        {item.timeStart}
                      </p>
                    )}
                    {item.duration && (
                      <p className="text-white">
                        <span className="font-bold">Duração:</span>{' '}
                        {item.duration}
                      </p>
                    )}
                    {item.location && (
                      <p className="text-white">
                        <span className="font-bold">Local:</span>{' '}
                        {item.location}
                      </p>
                    )}
                  </div>
                  <div>
                    {item.link && (
                      <a href={item.link} className="text-white underline">
                        Saiba mais
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {events.length > 3 && (
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

export default Carousel
