import { VideoPlayer } from '../Video'

export const Infos = ({ info, video }) => {
  return (
    <section className="mx-auto mb-20 mt-10 w-full max-w-7xl space-y-14 px-6 text-white md:px-14">
      <h1
        className="w-full max-w-[1079.63px] font-['Libre_Baskerville'] text-3xl font-normal sm:text-4xl md:text-5xl"
        dangerouslySetInnerHTML={{ __html: info.title }}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <VideoPlayer video={video} />

        <div className="flex w-full flex-col gap-4 sm:gap-8 lg:max-w-[431px]">
          <h2 className="w-full font-['Libre_Baskerville'] text-4xl font-bold sm:text-5xl lg:max-w-[350px]">
            {info.subtitle}
          </h2>
          <p className="text-lg font-extralight sm:text-xl">
            {info.description}
          </p>
        </div>
      </div>
    </section>
  )
}
