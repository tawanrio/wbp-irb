import { useState, useEffect } from 'react'
import Dots from './components/Dots'
import ContentBanner from './components/ContentBanner'
import Arrow from './components/Arrow'

export default function Banner({ banners, stlyeText, page }) {
  const [activeBanner, setActiveBanner] = useState(0)
  const [size, setSize] = useState(banners?.size.height)
  const showButtonsBanner = banners?.carousel.length > 1
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth < 760)

      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 760)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    if (page !== 'home') return

    if (isSmallScreen) {
      setSize(400) // Define o tamanho do banner para telas pequenas
    } else {
      setSize(banners?.size.height) // Define o tamanho padrão do banner
    }
  }, [isSmallScreen, banners, page])

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
    <section className="relative" id="banner_">
      <div
        id="containerBanner"
        className={`relative mb-4 flex justify-center bg-[#03050ede] md:mb-0`}
        style={{ height: size }}
      >
        {showButtonsBanner && (
          <Dots
            controllerBanner={{ banners, setActiveBanner, activeBanner, size }}
          />
        )}

        <ContentBanner
          controllerBanner={{
            banners,
            setActiveBanner,
            activeBanner,
            size,
          }}
          stlyeText={stlyeText}
        />

        {showButtonsBanner && (
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
        )}
      </div>
    </section>
  )
}
