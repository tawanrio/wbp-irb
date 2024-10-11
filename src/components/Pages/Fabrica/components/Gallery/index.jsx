import Image from 'next/image'
import { useEffect, useState } from 'react'

export const Gallery = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
      } else {
        return prevIndex === 0 ? gallery.length - 3 : prevIndex - 1
      }
    })
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === gallery.length - 3 ? 0 : prevIndex + 1
      }
    })
  }

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

  return isMobile ? (
    <div className="relative w-full overflow-hidden">
      <ul
        className="mx-4 flex gap-7 py-5 transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 108}%)`,
        }}
      >
        {gallery.map((photo, index) => (
          <li
            key={index}
            className="h-72 w-full flex-shrink-0 list-none overflow-hidden duration-500 lg:w-[30%]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={346.61}
              className="h-72 w-full object-cover"
            />
          </li>
        ))}
      </ul>
      {gallery.length > 3 && (
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
  ) : (
    <>
      <ul className="mx-auto flex w-full max-w-[1600px] gap-2.5">
        {gallery[0].map((photo, index) => (
          <li
            key={index}
            className="h-screen max-h-[190px] w-full sm:max-h-[240px] md:max-h-[290px] lg:max-h-[346.61px]"
            style={{ maxWidth: photo.width }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={346.61}
              className="h-full max-h-[190px] w-full object-cover sm:max-h-[240px] md:max-h-[290px] lg:max-h-[346.61px]"
              style={{ maxWidth: photo.width }}
            />
          </li>
        ))}
      </ul>
      <ul className="mx-auto mt-2.5 flex w-full max-w-[1600px] gap-2.5">
        {gallery[1].map((photo, index) => (
          <li
            key={index}
            className="h-screen max-h-[190px] w-full sm:max-h-[240px] md:max-h-[290px] lg:max-h-[346.61px]"
            style={{ maxWidth: photo.width }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={346.61}
              className="h-full max-h-[190px] w-full object-cover sm:max-h-[240px] md:max-h-[290px] lg:max-h-[346.61px]"
              style={{ maxWidth: photo.width }}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
