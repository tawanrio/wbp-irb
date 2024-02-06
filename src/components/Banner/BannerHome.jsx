import {  useState, useEffect, useContext } from 'react';
import { PageData } from '@/context/pageData';

import Dots from './components/Dots';
import ImagesBannersHome from './components/ImagesBannersHome';
import Arrow from './components/Arrow';

export default function Banner({banners}) {
  const [activeBanner, setActiveBanner] = useState(0)

  const { _home } = useContext(PageData);
  const size = _home.banners.size.height


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
    <section className="relative"  id={`bannerHome`} >
        <div 
        style={{height:size}}
        className="flex justify-center md:mb-10 md:h-banner-home-h mb-3  " id='containerBanner'>
        <Dots controllerBanner={{banners,setActiveBanner, activeBanner, size}}/>
        <ImagesBannersHome controllerBanner={{banners,setActiveBanner, activeBanner,size}} backdrop />
        <Arrow controllerBanner={{banners,setActiveBanner, activeBanner, prevBanner, nextBanner,size}} />
      
      </div>
      <div className='bg-white-to-tramsp mt-[-215px] h-48 z-10 relative block'></div>
    </section>



  )
}