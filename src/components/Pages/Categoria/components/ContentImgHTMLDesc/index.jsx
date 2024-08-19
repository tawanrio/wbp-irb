import { useEffect, useState } from 'react'
import Image from 'next/image'
// import { sanitizeHtml } from '@/utils/functions'

export default function ContentImgHTMLDesc({ textHTML, image }) {
  const [sanitizedText, setSanitizedText] = useState('')

  useEffect(() => {
    if (textHTML) {
      setSanitizedText(textHTML)
    }
  }, [textHTML])

  return (
    <article
      id="content-img-description_"
      className="flex flex-col items-center"
    >
      <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-0 md:justify-between md:gap-10 md:px-14">
        <div className="mt-8 flex flex-col justify-between gap-8 md:my-6 md:flex-row md:gap-14">
          <div className="group relative h-[300px] md:h-[400px]">
            <div className="h-full overflow-hidden duration-700 group-hover:scale-105 md:min-w-[380px]">
              <div className="relative">
                {image?.title && (
                  <div className="z-90 absolute z-[99] flex min-h-[300px] w-full items-center justify-center bg-[#0a0a0aa3] text-2xl font-bold uppercase text-white md:min-h-[400px]">
                    {image?.title}
                  </div>
                )}
                <Image
                  src={image?.imageUrl}
                  fill
                  sizes="100vw"
                  alt={image?.alt}
                  quality={100}
                  className="z-20 h-full min-h-[300px] w-full object-cover duration-1000 md:min-h-[400px]"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-8 md:w-2/3">
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedText }}
              className="mb-2 flex text-justify text-base font-[400] text-[#666] md:text-lg"
            ></div>
          </div>
        </div>
      </div>
    </article>
  )
}
