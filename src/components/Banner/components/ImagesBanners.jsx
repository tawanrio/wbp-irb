import Image from 'next/image';

export default function Images({controllerBanner}) {
    const {activeBanner, setActiveBanner, banners} = controllerBanner
  return (
    <div className="w-full md:h-banner-home-h" id='imagesBanners'>
    {banners.carousel.map((banner, index)=> (
      <div key={index}
       className={`
      opacity-0
       absolute 
       w-full 
       flex 
       md:justify-center 
       ${index === activeBanner && '!opacity-100'}`} >
            <Image
            className="w-full md:h-banner-home-h h-52 object-cover drop-shadow-lg "
              src={banner.url}
              alt={banner.name}
              width={500}
              height={banners.size.height}
            />
            <div style={{alignItems: banner.position, textAlign: banner.position,  color:banners.colors.text }}
             className="
              md:h-banner-home-h
              md:px-28
              md:max-w-7xl 
              h-52
              px-16
              absolute
              top-0
              flex
              justify-center
              flex-col
              w-full
              ">
              <h2 className='
              md:text-4xl
              md:w-1/2
              w-2/3
              
              [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)]
              font-bold
              text-xl
              '>{banner.title}</h2>
              <p>{banner.description}</p>
            </div>

            </div>
        ))}
    
    </div>
  )
}