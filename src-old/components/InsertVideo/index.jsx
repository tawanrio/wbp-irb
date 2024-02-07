export default function InsertVideo({content, home}) {

    return (
      <>
      {! home ? (
        <div className="flex flex-col items-center " id={`video_`}>
        <div className="w-full max-w-7xl md:px-14 md:my-10 my-4 mb-6 px-6 flex justify-between">

        
        <video className="w-full shadow-[-20px_35px_90px_-30px_rgba(0,0,0,.8)]"  src={content?.url} controls width={1080} height={500}/>
        
        </div>
        </div>
        ):(
          <div className="w-full z-2 overflow-hidden flex flex-col items-center bg-[#152049] " id='imagesBanners'>
             <div className=" w-full flex items-center translate-y-[-80px] relative ">
            <video id="video_banner" muted autoPlay loop controls src={content?.url}  className="
            w-full
             shadow-[-20px_20px_90px_-30px_rgba(0,0,0,.8)]
             "    width={1080} height={500} >
               <source src={content?.url} />
              </video>
             
              <div className="absolute bg-[#1a1b4925] w-full h-full z-20"></div>
             </div>
          </div> 
        )
        }
        </>
    )
  }