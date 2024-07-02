import { useState } from 'react';
import Image from 'next/image';
import Dots from './components/Dots';
import ContentBanner from './components/ContentBanner';
import Arrow from './components/Arrow';
import InsertVideo from '@/components/InsertVideo';

export default function Banner({ banners, video }) {
  const [activeBanner, setActiveBanner] = useState(0);

  const size = banners?.size.height;
 

  function nextBanner() {
    const qntBanner = banners?.carousel.length - 1;
    if (activeBanner === qntBanner) {
      setActiveBanner(0);
    } else {
      setActiveBanner(activeBanner + 1);
    }
  }

  function prevBanner() {
    const qntBanner = banners?.carousel.length - 1;
    if (activeBanner === 0) {
      setActiveBanner(qntBanner);
    } else {
      setActiveBanner(activeBanner - 1);
    }
  }

  return (
    <section className="relative" id={`description_`}>
      <div 
        style={{ height: size }} 
        className="flex justify-center md:mb-10 mb-4 relative" 
        id='containerBanner'
      >
        <Dots controllerBanner={{ banners, setActiveBanner, activeBanner, size }} />
        {!video 
          ? (
            <ContentBanner controllerBanner={{ banners, setActiveBanner, activeBanner, size }} />
          ) : (
            <>
              <InsertVideo content={video} home />
              <div className='w-full md:h-full mt-14 md:mt-[-30px] absolute flex items-center flex-col justify-center'>
                <h2 className='w-full md:text-5xl  text-xl uppercase text-center text-[#fff] font-bold text-x z-10'>
                  {banners.carousel[0].title}
                </h2>
                <div className='flex flex-col mb-[-70px] md:w-[65%] w-[85%] md:max-w-5xl gap-5'>
                  {banners.carousel[0].description && (
                    <ul className='mt-5 flex flex-col list-disc gap-2 '>
                      {banners.carousel[0].description.map((text, tId) => (
                        <li 
                          key={tId} 
                          id={`description_`}
                          className='md:text-lg text-xs text-white m-0'
                        >
                          {text}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className='flex w-full justify-center md:gap-10 m:mb-16'>
                    <Image
                      quality={100}
                      width={200}
                      height={50}
                      className="w-[100px] md:w-[200px]"  // Add this line to adjust width on mobile
                      alt={'banner.url'}
                      src={'/images/certificados/iso-9001.png'}
                    />
                    <Image
                      quality={100}
                      width={200}
                      height={50}
                      className="w-[100px] md:w-[200px]"  // Add this line to adjust width on mobile
                      alt={'banner.url'}
                      src={'/images/certificados/iso-16949.png'}
                    />
                  </div>
                </div>
              </div>
            </>
          )
        }
        <Arrow controllerBanner={{ banners, setActiveBanner, activeBanner, prevBanner, nextBanner, size }} />
      </div>
    </section>
  );
}
