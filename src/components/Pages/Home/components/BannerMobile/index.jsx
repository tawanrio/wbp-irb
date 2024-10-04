import Image from 'next/image'
import Link from 'next/link'
import { LinkRed } from '@/components/LinkRed'

export const BannerMobile = ({ banners }) => {
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
              className="mx-auto w-full max-w-[281px]"
            >
              {button.name}
            </LinkRed>
          ))}
        </div>
      )}
      <figure
        className="h-full"
        style={{ maxHeight: banners?.size?.height_mobile }}
      >
        <Image
          src={banners?.carouselHomeMobile[0]?.url}
          alt={banners?.carouselHomeMobile[0]?.alt}
          height={banners?.size?.height_mobile}
          width={768}
          className="object-cover text-white"
        />
      </figure>
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
