import {  useState,} from 'react';


import Dots from './components/Dots';
import ImagesBanners from './components/ImagesBanners';
import Arrow from './components/Arrow';
import InsertVideo from '@/components/InsertVideo';

export default function Banner({banners, video}) {
  const [activeBanner, setActiveBanner] = useState(0)

  const size = banners?.size.height

  function nextBanner(){
    const qntBanner = banners?.carousel.length-1
    if(activeBanner === qntBanner){
      setActiveBanner(0)
    }else{
      setActiveBanner(activeBanner+1)
    }
  }
  function prevBanner(){
    const qntBanner = banners?.carousel.length-1
    if(activeBanner === 0){
      setActiveBanner(qntBanner)
    }else{
      setActiveBanner(activeBanner-1)
    }
  }
  if(banners?.carousel.length > 1){
    // useEffect(()=>{
    //   const interval = setInterval(nextBanner, 3000)
      
    //   return () => clearInterval(interval)  
    // },[activeBanner,nextBanner,banners])
  }
  
  return (
    <section className="relative"  id={`description_`} >
        <div 
        style={{height:size}}
        className="flex justify-center md:mb-10  mb-3 relative " id='containerBanner'>
        <Dots controllerBanner={{banners,setActiveBanner, activeBanner,size}}/>
        {!video 
        ? (<ImagesBanners controllerBanner={{banners,setActiveBanner, activeBanner,size}} />) 
        : (
        <><InsertVideo content={video} home/>
        <div 
        style={{height:size}}
        className='w-full absolute flex items-center'>
        <h2 className='
              w-full
              md:text-5xl
              uppercase
              absolute
              text-center
              md:px-[245px]
              text-[#fff]
              font-bold
              text-xl
              z-10
              '>{banners.carousel[0].title}</h2>
        </div></>)
        }
        <Arrow controllerBanner={{banners,setActiveBanner, activeBanner, prevBanner, nextBanner,size}} />
      
      </div>
    </section>



  )
}