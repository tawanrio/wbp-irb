import { useState } from 'react';
import Image from 'next/image';
import Dots from './components/Dots';
import ContentBanner from './components/ContentBanner';
import Arrow from './components/Arrow';
import InsertVideo from '@/components/InsertVideo';

export default function Banner({ banners, video, stlyeText }) {
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
        className={`flex justify-center md:mb-10 mb-4 relative bg-[#03050ede]   ${video && (`
          before:content-['']
          before:block
          before:absolute
          before:bg-[#3338579e]
          before:z-[2]
          before:w-full
          before:h-full 
          `)}`}
        id='containerBanner'
      >
        <Dots controllerBanner={{ banners, setActiveBanner, activeBanner, size }} />
        {!video 
          ? (
            <ContentBanner controllerBanner={{ 
                banners, 
                setActiveBanner, 
                activeBanner, 
                size 
              }} stlyeText={stlyeText} />
          ) : (
            <>
              <InsertVideo content={video} home />

                <div className='w-full md:h-full mt-14 md:mt-[10px] absolute flex items-center flex-col justify-center gap-[60px]'>
                  <h2 className="w-full md:text-[6rem] text-xl uppercase text-center font-semibold z-10 text-outline" data-text="REVOLUCIONANDO">
                    REVOLUCIONANDO
                  </h2>
                  <h3 className="w-full md:text-[3rem] text-white text-xl uppercase text-center font-extrabold z-10 " >O MERCADO DE AUTOPEÇAS!</h3>
                </div>
            </>
          )
        }
        <Arrow controllerBanner={{ banners, setActiveBanner, activeBanner, prevBanner, nextBanner, size }} />
      </div>
    </section>
  );
}
