export default function Dots({controllerBanner}) {
    const {activeBanner, setActiveBanner, banners} = controllerBanner
  return (
    <div id="dotsBanners" className={`absolute z-30 bottom-0 md:mb-10 mb-2 ${!(banners.carousel.length  > 1)&& 'md:hidden'}`}>
          {banners.carousel.map((banner, index)=>(
        <button type="button"
        key={index+'_'+crypto.randomUUID()}
        style={{ background:banners.colors.controllers }}
        className={`
        md:w-7
        md:h-[6px]
        md:mx-1
        h-1
        w-4
        mx-[3px]
        opacity-30
        cursor-pointer
        box-content
        ${index === activeBanner ? '!opacity-100' : ''}
        `}
        data-bs-target="" aria-label={"slide"+ index} aria-current="false" onClick={() => setActiveBanner(index)}>
        </button>

          ))}
      
      </div>
  )
}