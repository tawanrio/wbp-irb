import { cn } from '@/lib/utils'
import ImageBanner from './ImageBanner'
import VideoBanner from './VideoBanner'

export default function ContentBanner({
  controllerBanner,
  backdrop,
  stlyeText,
}) {
  const { activeBanner, banners } = controllerBanner

  const renderBanners = banners?.carousel.map((banner, index) => {
    const { url } = banner
    const isImage = url.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i)

    return (
      <div
        key={index}
        className={cn(
          'absolute flex w-full opacity-0 md:justify-center',
          backdrop
            ? 'before:absolute before:z-[2] before:block before:h-full before:w-full before:content-[""]'
            : 'before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#3338579e] before:content-[""]',
          index === activeBanner && '!opacity-100',
        )}
      >
        {isImage ? (
          <ImageBanner banner={banner} controllerBanner={controllerBanner} />
        ) : (
          <VideoBanner banner={banner} controllerBanner={controllerBanner} />
        )}

        {!stlyeText ? (
          <div
            style={{
              alignItems: banner.position,
              textAlign: banner.position,
              color: banners?.colors.text,
              height: controllerBanner.size,
            }}
            className="absolute top-0 flex w-full flex-col justify-center px-16 md:max-w-7xl md:px-14"
          >
            {banner.title && (
              <h2
                style={{ width: `${banner?.textWidth}%` }}
                className="dropShadownBanner z-10 w-2/3 text-xl font-bold md:w-[60%] md:text-5xl"
              >
                {banner.title}
              </h2>
            )}
            {banner.description && (
              <p className="dropShadownBanner z-10 w-2/3 text-xl font-normal [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)] md:w-[50%] md:text-2xl">
                {banner.description}
              </p>
            )}
          </div>
        ) : (
          <div className="absolute flex h-full w-full flex-col items-center justify-center gap-[20px] md:gap-[60px]">
            {banner.title && (
              <h2
                className="text-outline z-10 flex w-full flex-nowrap justify-center text-center text-4xl font-semibold uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                data-text={banner.title}
              >
                {banner.title}
              </h2>
            )}
            {banner.description && (
              <h3 className="z-10 w-full text-center text-2xl font-extrabold uppercase text-white sm:text-4xl md:text-4xl lg:text-5xl">
                {banner.description}
              </h3>
            )}
          </div>
        )}
      </div>
    )
  })

  return (
    <div className="w-full" id="imagesBanners">
      {renderBanners}
    </div>
  )
}
