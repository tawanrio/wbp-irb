/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { sanitizeHtml } from '@/utils/functions'

const DiffCarouselTwo = ({ content }) => {
  const [sanitizedContent, setSanitizedContent] = useState([])

  useEffect(() => {
    if (content && content.length > 0) {
      const sanitized = content.map((item) => ({
        ...item,
        descriptionHTML: sanitizeHtml(item.descriptionHTML),
      }))
      setSanitizedContent(sanitized)
    }
  }, [content])

  return (
    <section className="relative flex flex-col items-center" id="blog-carousel">
      <div className="relative mt-4 flex w-full max-w-lg flex-wrap px-6 md:max-w-7xl md:px-14">
        {sanitizedContent.map((item, index) => (
          <div key={index} className="mb-4 w-full flex-shrink-0 px-2 md:w-1/4">
            <div className="flex flex-col overflow-hidden rounded-md bg-white">
              <figure className="relative h-72 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="rounded-t-md object-contain"
                />
              </figure>
              <div className="fle flex-col justify-between py-4 text-[#AF231C]">
                <div>
                  <h2 className="mt-2 text-xl font-bold">{item.title}</h2>
                  <div
                    className="mt-4 h-14 font-normal text-[#666]"
                    dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
                  />
                </div>
                {item.viewMore.link && (
                  <div className="mt-4 flex justify-center">
                    <a
                      target={
                        item.viewMore.targetLink && item.viewMore.targetLink
                      }
                      href={item.viewMore.link}
                      className="inline-block w-72 rounded bg-gray-200 px-8 py-2 text-center font-semibold text-gray-800 transition-colors duration-300 hover:bg-gray-300"
                    >
                      {item.viewMore.title}
                    </a>
                  </div>
                )}
                {item.cta.link && (
                  <div className="mt-4 flex justify-center">
                    <a
                      target={item.cta.targetLink && item.cta.targetLink}
                      href={item.cta.link}
                      className="inline-block w-72 rounded bg-[#22326E] px-8 py-2 text-center font-semibold text-white transition-colors duration-300 hover:bg-[#3b4d8c]"
                    >
                      {item.cta.title}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DiffCarouselTwo
