export default function InsertVideo({content, home}) {

    return (
      <>
   
          <div className="w-full z-2 overflow-hidden flex flex-col items-center bg-[#03050e56] " id='imagesBanners'>
             <div className=" w-full flex items-center md:h-[50px] h-[800px] md:translate-y-[-80px] relative ">
            <video id="video_banner" muted autoPlay loop src={content?.url}  className="
            w-full
            object-cover
            md:h-[780px] 
            h-[340px]
             shadow-[-20px_20px_90px_-30px_rgba(0,0,0,.8)]
             "    width={1080} height={900} >
               <source 
               src={content?.url} />
              </video>
             
              <div className="absolute bg-[#1a1b4925] w-full h-full z-10"></div>
             </div>
          </div> 
      
        
        </>
    )
  }