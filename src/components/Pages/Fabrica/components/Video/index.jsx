import { useRef } from 'react'

export const VideoPlayer = () => {
  const videoRef = useRef(null)
  const playButtonRef = useRef(null)

  const handlePlayVideo = () => {
    videoRef.current.play()
    playButtonRef.current.style.display = 'none'
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        width={689}
        height={442}
        // controls
        className="rounded-[19px]"
        onPlay={() => (playButtonRef.current.style.display = 'none')}
        loop
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </video>
      <div
        ref={playButtonRef}
        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-[17px] bg-[#252121]"
        onClick={handlePlayVideo}
      >
        <svg
          width="119"
          height="139"
          viewBox="0 0 129 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 140.7V8.67139C4 5.65061 7.22005 3.71995 9.88456 5.14316L122.47 65.2794C125.168 66.7204 125.316 70.5329 122.739 72.1789L10.1528 144.071C7.49013 145.771 4 143.859 4 140.7Z"
            stroke="#B60C0C"
            strokeWidth="8"
          />
        </svg>
      </div>
    </div>
  )
}
