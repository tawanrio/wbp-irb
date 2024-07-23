export default function Arrow({ controllerBanner }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { activeBanner, setActiveBanner, banners, prevBanner, nextBanner } =
    controllerBanner
  return (
    <div
      id="arrowBanners"
      className={`md:max-w-8xl absolute w-full select-none ${!(banners?.carousel.length > 1) && 'hidden'} `}
    >
      <a
        style={{
          color: banners?.colors.controllers,
          height: controllerBanner?.size,
        }}
        className="md:h-banner-home-h absolute top-0 z-10 flex w-2/12 select-none items-center justify-center md:w-1/12"
        role="button"
        href="#"
        onClick={prevBanner}
      >
        <svg
          className="w-8 select-none md:w-24"
          xmlns="https://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </a>
      <a
        style={{ color: banners?.colors.controllers }}
        className="md:h-banner-home-h absolute right-0 top-0 z-10 flex h-52 w-2/12 select-none items-center justify-center md:w-1/12"
        role="button"
        href="#"
        onClick={nextBanner}
      >
        <svg
          className="w-8 select-none md:w-24"
          xmlns="https://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </div>
  )
}
