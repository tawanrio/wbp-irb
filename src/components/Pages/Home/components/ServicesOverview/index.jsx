import Image from 'next/image'
import { cn } from '@/utils/cn'
import {
  SERVICE_ADVANTAGES,
  QUALITY_CERTIFICATIONS,
  NAVIGATION_LINKS,
} from '@/utils/constants'
import { LinkRed } from '@/components/LinkRed'

export default function ServicesOverview() {
  return (
    <section
      id="blog-carousel"
      className="mx-auto my-4 flex w-full max-w-7xl flex-col gap-4 px-6 md:my-7 md:gap-10 md:px-14"
    >
      <div>
        <div className="flex justify-end gap-1.5">
          {QUALITY_CERTIFICATIONS?.map((icon, indexIcon) => (
            <figure key={indexIcon}>
              <Image
                src={icon.url}
                alt={icon.alt}
                quality={100}
                width={105.28}
                height={41.42}
                className={cn(
                  '!h-[80px] object-contain p-0',
                  icon.bg && 'my-1 !h-[70px] rounded-md bg-[#AF231C] !p-1',
                )}
              />
            </figure>
          ))}
        </div>
        <>
          <h1 className="font-['Libre_Baskerville'] text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Revolucionando
          </h1>
          <h2 className="text-3xl !font-thin text-white sm:text-4xl md:text-5xl">
            o mercado de <strong className="font-bold">autopeças</strong>
          </h2>
        </>
      </div>
      <ul className="mb-4 mt-7 flex w-full flex-row flex-wrap items-center justify-center gap-7">
        {NAVIGATION_LINKS.map((link, index) => (
          <LinkRed
            key={index}
            href={link.href}
            className="w-full max-w-[200px]"
          >
            {link.title}
          </LinkRed>
        ))}
      </ul>
      <ul className="mx-auto flex flex-row flex-wrap justify-center gap-4 lg:gap-10">
        {SERVICE_ADVANTAGES.map((card, index) => (
          <li
            key={index}
            className="flex w-full max-w-80 flex-col gap-3 rounded-3xl border border-solid border-[#FFFFFF4D] bg-[#D9D9D91A] p-10"
          >
            <Image
              src={card.icon.url}
              alt={card.icon.alt}
              quality={100}
              width={90.77}
              height={90.77}
            />
            <p
              className="m-0 text-2xl !font-thin text-white"
              dangerouslySetInnerHTML={{ __html: card.description }}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
