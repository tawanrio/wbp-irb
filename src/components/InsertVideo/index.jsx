// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function InsertVideo({ content, home }) {
  return (
    <>
      <div
        className="z-2 flex w-full flex-col items-center overflow-hidden bg-[#03050e56]"
        id="imagesBanners"
      >
        <div className="relative flex h-[800px] w-full items-center md:h-[50px] md:translate-y-[-80px]">
          <video
            id="video_banner"
            muted
            autoPlay
            loop
            src={content?.url}
            className="h-[340px] w-full object-cover shadow-[-20px_20px_90px_-30px_rgba(0,0,0,.8)] md:h-[780px]"
            width={1080}
            height={900}
          >
            <source src={content?.url} />
          </video>

          <div className="absolute z-10 h-full w-full bg-[#1a1b4925]"></div>
        </div>
      </div>
    </>
  )
}
