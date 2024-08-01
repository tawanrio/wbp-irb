/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import SectionTitle from '../SectionTitle'
import dynamic from 'next/dynamic'
import Details from '../Details'
import Link from 'next/link'

// const InsertText = dynamic(() => import('@/components/InserText'), { ssr: false })

export default function imgCatalogDescription({ content, className }) {
  return (
    <>
      <article
        className={`flex flex-col items-center ${className}`}
        id={`content-img-description_`}
      >
        <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-0 md:justify-between md:gap-6 md:px-14">
          {content?.title && <SectionTitle title={content?.title} />}
          <div className="mt-8 flex flex-col justify-start gap-8 md:mb-4 md:mt-0 md:flex-row md:gap-14">
            <div className="group relative">
              <div
                style={{ borderRadius: '20px' }}
                className="h-[500px] min-h-[100px] overflow-hidden duration-700 group-hover:scale-105 md:h-full md:min-w-[255px]"
              >
                <div className="relative h-full">
                  {/* <Image
                        src={content?.imageProduct.imageUrl}
                        fill
                        sizes="100vw"
                        quality={100}
                        alt={content?.imageProduct.alt}
                        className="
                            z-20
                            group-hover:scale-100
                            duration-1000
                        "/> */}

                  <img
                    src={content?.imageProduct.image}
                    alt={content?.imageProduct.alt}
                    className="h-[500px] w-64"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 md:w-2/3">
              <h3 className="text-2xl font-semibold text-[#666]">
                {content?.subtitle}
              </h3>
              <Details
                content={content?.description}
                datetime="2016-10-25"
                suppressHydrationWarning
              />
              <div className="flex gap-5">
                <Link
                  target="_blank"
                  href={content?.button[0].link}
                  className="mt-4 w-[200px] rounded-xl text-center font-semibold text-white"
                >
                  <div className="relative h-[55px]">
                    <Image
                      src={content?.button[0].image}
                      fill
                      sizes="100vw"
                      quality={100}
                      alt={content?.button[0].alt}
                      className=""
                    />
                  </div>
                </Link>

                <Link
                  target="_blank"
                  href={content?.button[1].link}
                  className="mt-4 w-[200px] rounded-xl text-center font-semibold text-white"
                >
                  <div className="relative h-[55px]">
                    <Image
                      src={content?.button[1].image}
                      fill
                      sizes="100vw"
                      quality={100}
                      alt={content?.button[1].alt}
                      className=""
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
