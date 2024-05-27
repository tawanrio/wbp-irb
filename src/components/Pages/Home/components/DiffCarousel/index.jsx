import { useState } from 'react';
import Image from 'next/image';

const DiffCarousel = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? content.length - 1 : prevIndex - 1));
    setShowMore(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === content.length - 1 ? 0 : prevIndex + 1));
    setShowMore(false);
  };

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <section className="relative flex flex-col items-center" id="blog-carousel">
      <div className="w-full relative md:max-w-7xl md:px-14 md:mb-10 my-4 px-6 flex max-w-lg">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {content.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="flex flex-col bg-white rounded-md overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-md"
                    />
                    <a href={item.link} title={item.title} className="absolute inset-0"></a>
                  </div>
                  <div className="py-4 flex flex-col justify-between text-[#666]">
                    <div>
                      <h2 className="text-2xl font-bold mt-2">{item.title}</h2>
                      <div
                        className="text-[#666] mt-4"
                        dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                      />
                    </div>
                    {item.cta && (
                      <div className="mt-4 flex">
                        <a
                          target={item.cta.targetLink && item.cta.targetLink}
                          href={item.cta.link}
                          className="inline-block px-8 py-2 w-72 text-center bg-[#22326E] text-white font-semibold rounded hover:bg-[#3b4d8c] transition-colors duration-300"
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
                            className="inline-block px-8 py-2 w-72 text-center bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition-colors duration-300"
                          >
                            {showMore ? 'Ver menos' : 'Ver mais'}
                          </button>
                        </div>
                        <div>
                          {showMore && (
                            <div
                              className="text-[#666] mt-4"
                              dangerouslySetInnerHTML={{ __html: item.contentHTML }}
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
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3  shadow-md hover:bg-gray-700 transition-colors duration-300"
          style={{ zIndex: 1 }}
        >
          {'<'}
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3  shadow-md hover:bg-gray-700 transition-colors duration-300"
          style={{ zIndex: 1 }}
        >
          {'>'}
        </button>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index ? 'bg-[#22326E]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default DiffCarousel;
