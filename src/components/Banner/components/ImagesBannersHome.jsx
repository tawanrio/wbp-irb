import Image from 'next/image';

export default function Images({controllerBanner, backdrop}) {
    const {activeBanner, setActiveBanner, banners} = controllerBanner
  return (
    <div className="w-full md:h-banner-home-h" id='imagesBanners'>
    {banners?.carousel.map((banner, index)=> (
      <div key={index}
       className={`
       ${backdrop &&`
       before:content-['']
       before:block
       before:absolute
       before:bg-circle
       before:z-[2]
       before:w-full
       before:h-full
       `}
      opacity-0
       absolute 
       w-full 
       flex 
       md:justify-center 
       ${index === activeBanner && '!opacity-100'}`} >
        <div style={{height:controllerBanner?.size}}>
            <Image
            className={` object-cover 
           
            `}
              quality={80}
              fill
              sizes="100vw"
              src={banner.url}
              alt={banner.alt || 'Banner'}
            />
            </div>
            <div style={{alignItems: banner.position, textAlign: banner.position,  color:banners?.colors.text,height:controllerBanner.size }}
             className="
              md:h-banner-home-h
              md:px-0
              md:max-w-6xl 
              px-16
              absolute
              top-0
              flex
              justify-center
              flex-col
              w-full
              ">
              <h2 className='
              md:text-5xl
              md:w-1/2
              dropShadownBanner
              w-2/3
              
              [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)]
              font-bold
              text-xl
              z-10
              '>{banner.title}</h2>
              <p>{banner.description}</p>
            </div>
            </div>
        ))}
    
    </div>
  )
}