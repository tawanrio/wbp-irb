import { useState, useEffect } from 'react'
import { CarouselLoop } from '@/components/Carousel/CarouselLoop'
import { OPTIONS } from '@/utils/constants'

export const Videos = () => {
  const [videos, setVideos] = useState([])
  const CACHE_EXPIRATION = 1000 * 60 * 60 * 24

  useEffect(() => {
    const fetchVideos = async () => {
      const cachedData = localStorage.getItem('youtube_videos')
      const cachedTime = localStorage.getItem('youtube_videos_timestamp')

      if (
        cachedData &&
        cachedTime &&
        Date.now() - cachedTime < CACHE_EXPIRATION
      ) {
        setVideos(JSON.parse(cachedData))
      } else {
        const res = await fetch('/api/youtube')
        const data = await res.json()

        localStorage.setItem('youtube_videos', JSON.stringify(data))
        localStorage.setItem('youtube_videos_timestamp', Date.now())

        setVideos(data)
      }
    }

    fetchVideos()
  }, [CACHE_EXPIRATION])

  return (
    <div className="pb-24 pt-0">
      <CarouselLoop
        options={OPTIONS}
        array={videos}
        classNameButtons="top-[55%]"
      >
        {videos.length > 0 &&
          videos.map((video) => (
            <li
              key={video.id.videoId}
              className="embla__slide_loop !max-w-[40rem]"
            >
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          ))}
      </CarouselLoop>
    </div>
  )
}
