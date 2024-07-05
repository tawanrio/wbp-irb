import { useState } from 'react';
import Image from 'next/image';

const DiffCarouselTwo = ({ content }) => {

console.log(content);
  return (
    <section className="relative flex flex-col items-center" id="blog-carousel">
      <div className="w-full relative md:max-w-7xl md:px-14 mt-4 px-6 flex max-w-lg flex-wrap">
        {content.map((item, index) => (
          <div key={index} className="md:w-1/4 w-full flex-shrink-0 px-2 mb-4">
            <div className="flex flex-col bg-white rounded-md overflow-hidden">
              <div className="relative w-full h-72">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-md"
                />
                <a href={item.link} title={item.title} className="absolute inset-0"></a>
              </div>
              <div className="py-4 fle  flex-col  justify-between text-[#AF231C]">
                <div>
                  <h2 className="text-xl font-bold mt-2 ">{item.title}</h2>
                  <div
                    className="text-[#666] font-normal mt-4 h-14"
                    dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                  />
                </div>
                {item.viewMore.link && (
                     <div className="mt-4 flex justify-center">
                <a
                  target={item.viewMore.targetLink && item.viewMore.targetLink}
                  href={item.viewMore.link}
                  className="inline-block px-8 py-2  w-72 text-center bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition-colors duration-300"
                >
                  {item.viewMore.title}
                </a>
                </div>
                    )}
                {item.cta.link && (
                  <div className="mt-4 flex justify-center">
                    <a
                      target={item.cta.targetLink && item.cta.targetLink}
                      href={item.cta.link}
                      className="inline-block px-8 py-2 w-72 text-center bg-[#22326E] text-white font-semibold rounded hover:bg-[#3b4d8c] transition-colors duration-300"
                    >
                      {item.cta.title}
                    </a>
                  </div>
                )}
                 
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiffCarouselTwo;
