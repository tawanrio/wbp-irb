import { useState } from 'react'
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
    <section className="relative" id="description_">
      <div
        id="containerBanner"
        className={`relative mb-4 flex justify-center bg-[#03050ede] md:mb-10 ${
          video &&
          `before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#3338579e] before:content-['']`
        }`}
        style={{ height: size }}
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

            <div className="absolute my-auto flex h-full w-full flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-[60px]">
              <h2
                className="text-outline z-10 w-full text-center text-3xl font-semibold uppercase sm:text-5xl md:text-6xl lg:text-8xl"
                data-text="REVOLUCIONANDO"
              >
                REVOLUCIONANDO
              </h2>
              <h3 className="z-10 w-full text-center text-xl font-extrabold uppercase text-white sm:text-2xl md:text-3xl lg:text-5xl">
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
