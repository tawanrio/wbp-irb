/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function TimeLineNew() {
  const events = [
    { year: '1998', description: 'Fundação da empresa' },
    {
      year: '1998-2007',
      description:
        'Nos tornamos especialistas e referência no mercado nas linhas de Rolamentos e Cubos de roda',
    },
    { year: '2007', description: 'Início das importações' },
    {
      year: '2019',
      description: 'Lançamento das linhas de Radiadores, Trizetas e Linha 6000',
    },
    {
      year: '2024',
      description: 'Lançamento das linhas de Cubos Vazios e Eletroventiladores',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewIndex, setViewIndex] = useState(0)
  const [bulletsToShow, setBulletsToShow] = useState(5)
  const intervalRef = useRef(null)

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
    }, 3000)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBulletsToShow(2)
        setViewIndex(Math.floor(currentIndex / 2) * 2)
      } else {
        setBulletsToShow(5)
        setViewIndex(Math.floor(currentIndex / 5) * 5)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex])

  useEffect(() => {
    resetInterval()
    return () => clearInterval(intervalRef.current)
  }, [events.length])

  const nextEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
    resetInterval()
  }

  const prevEvent = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length,
    )
    resetInterval()
  }

  const changeEvent = (index) => {
    setCurrentIndex(index)
    resetInterval()
  }

  return (
    <section className="flex flex-col items-center" id="timeline">
      <div className="my-4 flex w-full max-w-7xl flex-col items-center justify-between px-6 md:my-7 md:px-14">
        <div className="flex w-full flex-col-reverse items-center gap-10 md:w-11/12">
          <div className="mt-4 text-center">
            <p className="text-xl font-bold">{events[currentIndex].year}</p>
            <span className={`opacity-100 transition-opacity duration-500`}>
              {events[currentIndex].description}
            </span>
          </div>
          <div className="relative flex h-[100px] w-full items-center justify-between overflow-hidden">
            <button
              onClick={prevEvent}
              className="mt-6 flex size-10 items-center justify-center rounded-full bg-white p-2 md:block"
            >
              <Image
                src="/images/arrow.svg"
                alt="Previous"
                width={24}
                height={24}
                className="rotate-90 transform"
              />
            </button>
            <div className="relative flex h-full w-full snap-x snap-mandatory items-center justify-center gap-2 overflow-x-auto">
              <div className="absolute inset-0 top-7 flex items-center justify-center">
                <div
                  className="w-full border-t-2"
                  style={{ borderColor: '#22326E' }}
                ></div>
              </div>
              {events
                .slice(viewIndex, viewIndex + bulletsToShow)
                .map((event, index) => (
                  <div
                    key={index}
                    className="relative z-10 flex snap-center flex-col items-center"
                  >
                    <span className="mb-1 w-32 text-center">{event.year}</span>
                    <div
                      onClick={() => changeEvent(viewIndex + index)}
                      className={`size-6 cursor-pointer rounded-full border-2 bg-white duration-500 hover:scale-125 ${viewIndex + index === currentIndex ? 'flex items-center justify-center' : ''}`}
                      style={{ borderColor: '#22326E' }}
                    >
                      {viewIndex + index === currentIndex && (
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: '#22326E' }}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={nextEvent}
              className="mt-6 flex size-10 items-center justify-center rounded-full bg-white p-2 md:block"
            >
              <Image
                src="/images/arrow.svg"
                alt="Next"
                width={24}
                height={24}
                className="-rotate-90 transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
