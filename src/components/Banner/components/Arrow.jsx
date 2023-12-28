export default function Arrow({controllerBanner}) {
    const {activeBanner, setActiveBanner, banners, prevBanner, nextBanner} = controllerBanner
  return (
    <div 
    id="arrowBanners"
    className={`
      absolute 
      w-full 
      md:max-w-[85rem]
      
      
      ${!(banners.carousel.length  > 1)&& 'hidden'}
      `}>

      <a 
       style={{ color:banners.colors.controllers }}
      className="
      md:h-banner-home-h
      h-52
      absolute 
      top-0 
      items-center
      justify-center
      md:w-1/12
      w-2/12
      flex
      " role="button" tabindex="0" href="#" onClick={prevBanner}>
      <svg className="md:w-24 w-8" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round" ><path d="m15 18-6-6 6-6"/></svg>
      </a>
      <a 
      style={{ color:banners.colors.controllers }}
      className="
      md:h-banner-home-h

      absolute 
      top-0 
      flex 
      right-0
      justify-center
      md:w-1/12
      w-2/12
      h-52
      items-center
      " role="button" tabindex="0" href="#" onClick={nextBanner}>
        <svg className="md:w-24 w-8" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round" ><path d="m9 18 6-6-6-6"/></svg>
      </a>
        </div>
  )
}