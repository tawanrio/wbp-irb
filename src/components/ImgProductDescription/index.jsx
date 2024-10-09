/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import SectionTitle from '../SectionTitle'
import dynamic from 'next/dynamic'
import Details from '../Details'
import Link from 'next/link'

// const InsertText = dynamic(() => import('@/components/InserText'), { ssr: false })

export default function ImgProductDescription({
  image,
  description,
  title,
  button,
}) {
  return (
    <>
      <article
        className="flex flex-col items-center"
        id={`content-img-description_`}
      >
        <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-10 md:justify-between md:gap-10 md:px-14">
          {title && <SectionTitle title={title} />}
          <div className="mt-8 flex flex-col justify-between gap-8 md:my-6 md:flex-row md:gap-14">
            <div className="group relative h-[150px] md:h-[400px]">
              <div
                style={{ borderRadius: '20px' }}
                className="h-full overflow-hidden duration-700 group-hover:scale-105 md:min-w-[500px]"
              >
                <div className="relative">
                  <Image
                    src={image.imageUrl}
                    fill
                    sizes="100vw"
                    quality={100}
                    alt={image.alt}
                    className="z-20 h-full min-h-[100px] w-full object-cover duration-1000 group-hover:scale-100 md:min-h-[400px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex max-h-[450px] w-full flex-col gap-8 overflow-auto overflow-x-hidden md:w-2/3">
              <Details
                content={description}
                datetime="2016-10-25"
                suppressHydrationWarning
              />
              {button && (
                <Link
                  href={button.link}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 w-[180px] rounded-xl bg-[#68b1e9] px-4 py-2 text-center font-semibold text-white"
                >
                  {button.title}
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
