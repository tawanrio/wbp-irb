import SectionTitle from '@/components/SectionTitle';
import { useState, useEffect } from 'react';

const Carousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === 0 ? events.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === 0 ? events.length - 3 : prevIndex - 1;
      }
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (isMobile) {
        return prevIndex === events.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === events.length - 3 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section className="flex flex-col items-center" id="timeline">
      <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6 flex flex-col justify-between md:gap-10">
        <SectionTitle title="Nossos eventos" line />

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform gap-7 duration-1000 ease-in-out py-5 mx-4"
            style={{ transform: `translateX(-${currentIndex * (isMobile ? 108 : (100 / 3))}%)` }}
          >
            {events.map((item, index) => (
              <div key={index} className="md:w-[30%] w-full flex-shrink-0 hover:scale-95 duration-500 rounded-md overflow-hidden">
                <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-4">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-white text-xl font-bold">{item.title}</h3>
                      <p className="text-white">{item.description}</p>
                    </div>
                    <div>
                      {item.date && <p className="text-white"><span className='font-bold'>Data:</span> {item.date}</p>}
                      {item.timeStart && <p className="text-white"><span className='font-bold'>Horário:</span> {item.timeStart}</p>}
                      {item.duration && <p className="text-white"><span className='font-bold'>Duração:</span> {item.duration}</p>}
                      {item.location && <p className="text-white"><span className='font-bold'>Local:</span> {item.location}</p>}
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
                className="absolute hover:bg-[#999] hover:opacity-100 opacity-70 duration-500 left-0 top-1/2 transform -translate-y-1/2 bg-[#22326e] text-white p-3   shadow-md"
              >
                {'<'}
              </button>
              <button
                onClick={nextSlide}
                className="absolute hover:bg-[#999] hover:opacity-100 opacity-70 duration-500 right-0 top-1/2 transform -translate-y-1/2 bg-[#22326e] text-white p-3   shadow-md"
              >
                {'>'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
