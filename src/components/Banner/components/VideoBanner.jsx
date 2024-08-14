import React from 'react'

export default function VideoBanner({ banner, controllerBanner }) {
  return (
    <div
      className="z-2 flex w-full flex-col items-center overflow-hidden bg-[#152049]"
      id="imagesBanners"
      style={{ height: controllerBanner?.size }}
    >
      <div
        style={{ height: controllerBanner?.size }}
        className="relative flex w-full items-center md:h-[50px]"
      >
        <video
          id="video_banner"
          muted
          autoPlay
          loop
          src={banner?.url}
          style={{ height: controllerBanner?.size }}
          className="w-full object-cover shadow-[-20px_20px_90px_-30px_rgba(0,0,0,.8)] md:h-[780px]"
          width={1080}
          height={900}
        >
          <source src={banner?.url} />
        </video>

        {/* <div className="absolute z-10 h-full w-full bg-[#1a1b4925]"></div> */}
      </div>
    </div>
  )
}
