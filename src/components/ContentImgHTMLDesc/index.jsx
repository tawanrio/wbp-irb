/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import SectionTitle from '../../../../SectionTitle'
import InsertText from '@/components/InserText'
import dynamic from 'next/dynamic'

// const InsertText = dynamic(() => import('@/components/InserText'), { ssr: false })

export default function ContentImgDescription({ content }) {
  return (
    <>
      <article
        className="mb-[-30px] flex flex-col items-center"
        id={`content-img-description_`}
      >
        <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-10 md:justify-between md:gap-10 md:px-14">
          {content?.title && <SectionTitle title={content?.title} />}
          <div className="mt-8 flex flex-col justify-between gap-8 md:my-6 md:flex-row md:gap-14">
            <div className="group relative h-[200px] md:h-[400px]">
              <div
                style={{ borderRadius: content?.borderRadius }}
                className="h-full overflow-hidden duration-700 group-hover:scale-105 md:min-w-[380px]"
              >
                <div className="relative">
                  <div className="z-90 absolute z-[99] flex min-h-[200px] w-full items-center justify-center bg-[#0a0a0aa3] text-2xl font-bold uppercase text-white md:min-h-[400px]">
                    {content?.titleImg}
                  </div>
                  <Image
                    src={content?.image}
                    fill
                    sizes="100vw"
                    alt="imagem"
                    quality={100}
                    className="z-20 h-full min-h-[200px] w-full scale-110 object-cover duration-1000 group-hover:scale-100 md:min-h-[400px]"
                  />
                </div>
              </div>
              {content?.imageSobre && (
                <div className="relative">
                  <Image
                    alt="imagem description"
                    src={content?.imageSobre}
                    fill
                    sizes="100vw"
                    quality={100}
                    className="absolute bottom-0 left-0 translate-x-[-50px] translate-y-[-23px] scale-[1.10] duration-700 group-hover:translate-y-[-43px] group-hover:scale-[1.25]"
                  />
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-8 md:w-2/3">
              <InsertText
                content={content?.description}
                datetime="2016-10-25"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
