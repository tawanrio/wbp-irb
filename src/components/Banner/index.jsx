/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import Image from 'next/image'
import Dots from './components/Dots'
import ContentBanner from './components/ContentBanner'
import Arrow from './components/Arrow'
import InsertVideo from '@/components/InsertVideo'

export default function Banner({ banners, video, stlyeText }) {
  const [activeBanner, setActiveBanner] = useState(0)

  const size = banners?.size.height

  function nextBanner() {
    const qntBanner = banners?.carousel.length - 1
    if (activeBanner === qntBanner) {
      setActiveBanner(0)
    } else {
      setActiveBanner(activeBanner + 1)
    }
  }

  function prevBanner() {
    const qntBanner = banners?.carousel.length - 1
    if (activeBanner === 0) {
      setActiveBanner(qntBanner)
    } else {
      setActiveBanner(activeBanner - 1)
    }
  }

  return (
    <section className="relative" id={`description_`}>
      <div
        style={{ height: size }}
        className={`relative mb-4 flex justify-center bg-[#03050ede] md:mb-10 ${
          video &&
          `before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#3338579e] before:content-['']`
        }`}
        id="containerBanner"
      >
        <Dots
          controllerBanner={{ banners, setActiveBanner, activeBanner, size }}
        />
        {!video ? (
          <ContentBanner
            controllerBanner={{
              banners,
              setActiveBanner,
              activeBanner,
              size,
            }}
            stlyeText={stlyeText}
          />
        ) : (
          <>
            <InsertVideo content={video} home />

            <div className="absolute mt-14 flex w-full flex-col items-center justify-center gap-[60px] md:mt-[10px] md:h-full">
              <h2
                className="text-outline z-10 w-full text-center text-xl font-semibold uppercase md:text-[6rem]"
                data-text="REVOLUCIONANDO"
              >
                REVOLUCIONANDO
              </h2>
              <h3 className="z-10 w-full text-center text-xl font-extrabold uppercase text-white md:text-[3rem]">
                O MERCADO DE AUTOPEÇAS!
              </h3>
            </div>
          </>
        )}
        <Arrow
          controllerBanner={{
            banners,
            setActiveBanner,
            activeBanner,
            prevBanner,
            nextBanner,
            size,
          }}
        />
      </div>
    </section>
  )
}
