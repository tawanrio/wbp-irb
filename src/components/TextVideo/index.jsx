/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import SectionTitle from '../SectionTitle'
import Description from '../Description'

export default function ContentImgDescription({ video, description }) {
  return (
    <>
      <article
        className="flex flex-col items-center"
        id={`content-img-description_`}
      >
        <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-0 md:mb-2 md:justify-between md:gap-10 md:px-14">
          <div className="mt-8 flex flex-col justify-between gap-8 md:my-2 md:flex-row md:gap-14">
            <div className="flex w-full flex-col gap-8 md:w-2/3">
              <Description content={description} size={'18px'} />
            </div>
            <div className="group relative">
              <div className="overflow-hidden duration-700">
                <video
                  className="mt-2 w-full shadow-[-20px_35px_90px_-30px_rgba(0,0,0,.8)]"
                  src={video?.url}
                  controls
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
