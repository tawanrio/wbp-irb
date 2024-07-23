/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'

export default function Images({ controllerBanner, backdrop }) {
  const { activeBanner, setActiveBanner, banners } = controllerBanner
  return (
    <div className="md:h-banner-home-h w-full" id="imagesBanners">
      {banners?.carousel.map((banner, index) => (
        <div
          key={index}
          className={` ${
            backdrop &&
            `before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-circle before:content-['']`
          } absolute flex w-full opacity-0 md:justify-center ${index === activeBanner && '!opacity-100'}`}
        >
          <div style={{ height: controllerBanner?.size }}>
            <Image
              className={`object-cover`}
              quality={80}
              fill
              sizes="100vw"
              src={banner.url}
              alt={banner.alt || 'Banner'}
            />
          </div>
          <div
            style={{
              alignItems: banner.position,
              textAlign: banner.position,
              color: banners?.colors.text,
              height: controllerBanner.size,
            }}
            className="md:h-banner-home-h absolute top-0 flex w-full flex-col justify-center px-16 md:max-w-6xl md:px-0"
          >
            <h2 className="dropShadownBanner z-10 w-2/3 text-xl font-bold [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)] md:w-1/2 md:text-5xl">
              {banner.title}
            </h2>
            <p>{banner.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
