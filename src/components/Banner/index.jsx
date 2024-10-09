import { useState, useEffect } from 'react'
import Dots from './components/Dots'
import ContentBanner from './components/ContentBanner'
import Arrow from './components/Arrow'
import Link from 'next/link'
import { LinkRed } from '../LinkRed'

export default function Banner({ banners, stlyeText, page }) {
  const [activeBanner, setActiveBanner] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [size, setSize] = useState(banners?.size.height)

  const carousel =
    page?.title === 'Home' && isSmallScreen
      ? banners?.carouselHomeMobile
      : page?.title === 'Home'
        ? banners?.carouselHome
        : isSmallScreen
          ? banners?.carousel
          : banners?.carousel
  const showButtonsBanner = carousel.length > 1

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
    } else {
      setIsSmallScreen(false)
    }
  }, [])

  useEffect(() => {
    if (page?.title === 'Home' && isSmallScreen) {
      setSize(banners?.size.height_mobile || 400)
    } else {
      setSize(banners?.size.height)
    }
  }, [isSmallScreen, banners, page])

  function nextBanner() {
    const qntBanner = carousel.length - 1
    if (activeBanner === qntBanner) {
      setActiveBanner(0)
    } else {
      setActiveBanner(activeBanner + 1)
    }
  }

  function prevBanner() {
    const qntBanner = carousel.length - 1
    if (activeBanner === 0) {
      setActiveBanner(qntBanner)
    } else {
      setActiveBanner(activeBanner - 1)
    }
  }

  return (
    <section className="relative" id="banner_">
      {banners?.linksHeader?.length > 0 && (
        <div className="mx-auto mb-12 mt-10 flex w-full max-w-[800px] flex-row flex-wrap items-center justify-between gap-4 px-4 sm:mt-14">
          {banners?.linksHeader.map((button, index) => (
            <LinkRed
              key={index}
              href={button.url}
              style={{
                background: button.colors.bg,
                color: button.colors.text,
              }}
              target="_blank"
              rel="noopener"
              className="mx-auto w-full max-w-[281px]"
            >
              {button.name}
            </LinkRed>
          ))}
        </div>
      )}
      <div
        id="containerBanner"
        className="relative mb-4 flex justify-center bg-[#03050ede] md:mb-0"
        style={{ height: size }}
      >
        {showButtonsBanner && (
          <Dots
            controllerBanner={{
              carousel,
              banners,
              setActiveBanner,
              activeBanner,
              size,
            }}
          />
        )}

        <ContentBanner
          controllerBanner={{
            carousel,
            banners,
            setActiveBanner,
            activeBanner,
            size,
          }}
          stlyeText={stlyeText}
          backdrop={page?.title === 'Home' || page?.title === 'Contato'}
        />

        {showButtonsBanner && (
          <Arrow
            controllerBanner={{
              carousel,
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

      {banners?.linksFooter?.length > 0 && (
        <div className="w-full bg-white pt-12">
          <div className="mx-auto flex w-full max-w-[800px] flex-row flex-wrap items-center justify-between gap-4 px-4">
            {banners?.linksFooter.map((button, index) => (
              <Link
                key={index}
                href={button.url}
                style={{
                  background: button.colors.bg,
                  color: button.colors.text,
                }}
                target="_blank"
                rel="noopener"
                className="mx-auto w-full max-w-[276.35px] rounded-full px-4 py-2 text-center text-xl font-normal shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95 sm:mx-0"
              >
                {button.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
