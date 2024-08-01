import { useState } from 'react'
import Image from 'next/image'

const DiffCarousel = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMore, setShowMore] = useState(false)

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1,
    )
    setShowMore(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content.length - 1 ? 0 : prevIndex + 1,
    )
    setShowMore(false)
  }

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore)
  }

  return (
    <section className="relative flex flex-col items-center" id="blog-carousel">
      <div className="relative mt-4 flex w-full max-w-lg px-6 md:max-w-7xl md:px-14">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {content.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="flex flex-col overflow-hidden rounded-md bg-white">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-md"
                    />
                    <a
                      href={item.link}
                      title={item.title}
                      className="absolute inset-0"
                    ></a>
                  </div>
                  <div className="flex flex-col justify-between py-4 text-[#666]">
                    <div>
                      <h2 className="mt-2 text-2xl font-bold">{item.title}</h2>
                      <div
                        className="mt-4 text-[#666]"
                        dangerouslySetInnerHTML={{
                          __html: item.descriptionHTML,
                        }}
                      />
                    </div>
                    {item.cta && (
                      <div className="mt-4 flex">
                        <a
                          target={item.cta.targetLink && item.cta.targetLink}
                          href={item.cta.link}
                          className="inline-block w-72 rounded bg-[#22326E] px-8 py-2 text-center font-semibold text-white transition-colors duration-300 hover:bg-[#3b4d8c]"
                          title={item.title}
                        >
                          {item.cta.title}
                        </a>
                      </div>
                    )}
                    {item.contentHTML && (
                      <>
                        <div className="mt-4 flex">
                          <button
                            onClick={toggleShowMore}
                            className="inline-block w-72 rounded bg-gray-200 px-8 py-2 text-center font-semibold text-gray-800 transition-colors duration-300 hover:bg-gray-300"
                          >
                            {showMore ? 'Ver menos' : 'Ver mais'}
                          </button>
                        </div>
                        <div>
                          {showMore && (
                            <div
                              className="mt-4 text-[#666]"
                              dangerouslySetInnerHTML={{
                                __html: item.contentHTML,
                              }}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-gray-800 p-3 text-white shadow-md transition-colors duration-300 hover:bg-gray-700"
          style={{ zIndex: 1 }}
        >
          {'<'}
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-gray-800 p-3 text-white shadow-md transition-colors duration-300 hover:bg-gray-700"
          style={{ zIndex: 1 }}
        >
          {'>'}
        </button>
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`size-3 rounded-full ${
              currentIndex === index ? 'bg-[#22326E]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default DiffCarousel
