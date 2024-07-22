/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import Image from 'next/image'
import Dots from './components/Dots'
import ContentBanner from './components/ContentBanner'
import Arrow from './components/Arrow'
import InsertVideo from '@/components/InsertVideo'

export default function Banner({ banners, video }) {
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
        className="relative mb-4 flex justify-center md:mb-10"
        id="containerBanner"
      >
        <Dots
          controllerBanner={{ banners, setActiveBanner, activeBanner, size }}
        />
        <ContentBanner
          controllerBanner={{ banners, setActiveBanner, activeBanner, size }}
        />
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
