export default function InsertVideo() {
    return (
      <div className="flex flex-col items-center " id={`video_`}>
        <div className="w-full max-w-7xl md:px-28 md:my-10 my-4 mb-6 px-6 flex justify-between">
  
          <video className="w-full shadow-[-20px_35px_90px_-30px_rgba(0,0,0,.8)]"  src={'/video/video2.mp4'} controls width={1080} height={500}/>
          
        </div>
      </div>
    )
  }