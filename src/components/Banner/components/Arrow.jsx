export default function Arrow({controllerBanner}) {
    const {activeBanner, setActiveBanner, banners, prevBanner, nextBanner} = controllerBanner
  return (
    <div 
    id="arrowBanners"
    className={`
      absolute 
      w-full 
      md:max-w-8xl
      select-none
      
      ${!(banners?.carousel.length  > 1)&& 'hidden'}
      `}>

      <a 
       style={{ color:banners?.colors.controllers,height:controllerBanner?.size }}
      className="
      md:h-banner-home-h
      absolute 
      top-0 
      items-center
      justify-center
      md:w-1/12
      w-2/12
      z-10
      select-none
      flex
      " role="button" href="#" onClick={prevBanner}>
      <svg className="md:w-24  w-8 select-none" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor"  ><path d="m15 18-6-6 6-6"/></svg>
      </a>
      <a 
      style={{ color:banners?.colors.controllers }}
      className="
      md:h-banner-home-h
      select-none
      absolute 
      top-0 
      flex 
      right-0
      justify-center
      md:w-1/12
      w-2/12
      h-52
      z-10
      items-center
      " role="button" href="#" onClick={nextBanner}>
        <svg className="md:w-24 w-8  select-none" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor"  ><path d="m9 18 6-6-6-6"/></svg>
      </a>
        </div>
  )
}