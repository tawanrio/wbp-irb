export default function Dots({ controllerBanner }) {
  const { activeBanner, setActiveBanner, banners } = controllerBanner
  return (
    <div
      id="dotsBanners"
      className={`absolute bottom-0 z-30 mb-2 md:mb-10 ${!(banners?.carousel.length > 1) && 'md:hidden'}`}
    >
      {banners?.carousel.map((banner, index) => (
        <button
          type="button"
          key={index + '_' + Math.random().toString().slice(-8)}
          style={{ background: banners?.colors.controllers }}
          className={`mx-[3px] box-content h-1 w-4 cursor-pointer select-none opacity-30 md:mx-1 md:h-[6px] md:w-7 ${index === activeBanner ? '!opacity-100' : ''} `}
          data-bs-target=""
          aria-label={'slide' + index}
          aria-current="false"
          onClick={() => setActiveBanner(index)}
        ></button>
      ))}
    </div>
  )
}
