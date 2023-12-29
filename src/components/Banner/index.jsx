import {  useState, useEffect } from 'react';

import Dots from './components/Dots';
import ImagesBanners from './components/ImagesBanners';
import Arrow from './components/Arrow';

export default function Banner({banners}) {
  const [activeBanner, setActiveBanner] = useState(0)


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
    <section className="relative"  id={`description_${crypto.randomUUID().slice(-8)}`} >
        <div className="flex justify-center md:mb-10 md:h-banner-home-h h-52 mb-3  " id='containerBanner'>
        <Dots controllerBanner={{banners,setActiveBanner, activeBanner}}/>
        <ImagesBanners controllerBanner={{banners,setActiveBanner, activeBanner}} />
        <Arrow controllerBanner={{banners,setActiveBanner, activeBanner, prevBanner, nextBanner}} />
      
      </div>
    </section>



  )
}