/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import SectionTitle from '../SectionTitle'
import Details from '../Details'

export default function imgCatalogDescription({ content, className }) {
  return (
    <>
      <article
        id="content-img-description_"
        className={`flex flex-col items-center ${className}`}
      >
        <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-0 md:justify-between md:gap-6 md:px-14">
          {content?.title && <SectionTitle title={content?.title} />}
          <div className="mt-8 flex flex-col justify-start gap-8 md:mb-4 md:mt-0 md:flex-row md:gap-14">
            <figure className="group h-[31.25rem] min-h-[6.25rem] rounded-[1.25rem]">
              <img
                src={content?.imageProduct.imageUrl}
                alt={content?.imageProduct.alt}
                className="h-full duration-700 group-hover:scale-105"
              />
            </figure>
            <div className="flex w-full flex-col gap-3 md:w-2/3">
              <h3 className="text-2xl font-semibold text-[#666]">
                {content?.subtitle}
              </h3>
              <Details
                content={content?.description}
                datetime="2016-10-25"
                suppressHydrationWarning
              />
              <div className="flex flex-wrap gap-5">
                <Link
                  target="_blank"
                  href={content?.button[0].link}
                  className="mt-4 w-[12.5rem] rounded-xl text-center font-semibold text-white"
                >
                  <figure className="relative h-[3.438rem]">
                    <img
                      src={content?.button[0].image}
                      alt={content?.button[0].alt}
                      className="w-full"
                    />
                  </figure>
                </Link>

                <Link
                  target="_blank"
                  href={content?.button[1].link}
                  className="mt-4 w-[12.5rem] rounded-xl text-center font-semibold text-white"
                >
                  <figure className="relative h-[3.438rem]">
                    <img
                      src={content?.button[1].image}
                      alt={content?.button[1].alt}
                      className="w-full"
                    />
                  </figure>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
