
import ImageBanner from './ImageBanner';
import VideoBanner from './VideoBanner';

export default function ContentBanner({controllerBanner, backdrop}) {
    const {activeBanner, setActiveBanner, banners} = controllerBanner

    const renderBanners = banners?.carousel.map((banner, index) => {
      const { url, alt, title, description, position } = banner;
    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
    const isImage = url.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i);
    
  return (
      <div key={index}
       className={`
       ${backdrop ? `
       before:content-['']
       before:block
       before:absolute
       before:bg-circle
       before:z-[2]
       before:w-full
       before:h-full
       ` : `
       before:content-['']
       before:block
       before:absolute
       before:bg-[#3338579e]
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

       {isImage ? 
       (<ImageBanner banner={banner} controllerBanner={controllerBanner} /> ):
        (<VideoBanner banner={banner} controllerBanner={controllerBanner} />)}

            <div style={{alignItems: banner.position, textAlign: banner.position,  color:banners?.colors.text,height:controllerBanner.size }}
             className="
              
              md:px-14
              md:max-w-7xl 
              px-16
              absolute
              top-0
              flex
              justify-center
              flex-col
              w-full
              ">
              <h2 
              style={{width: `${banner?.textWidth}%`}}
              className='
              md:text-5xl
              md:w-[60%]
              dropShadownBanner
              w-2/3
              
             
              font-bold
              text-xl
              z-10
              '>{banner.title}</h2>
              <p className='
              md:text-2xl
               md:w-[50%]
              dropShadownBanner
              w-2/3
              
              [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)]
              font-normal
              text-xl
              z-10 '>{banner.description}</p>
            </div>
            </div>
        )
      
      })

return (
  <div className="w-full " id='imagesBanners'>
    {renderBanners}
    </div>
)
}