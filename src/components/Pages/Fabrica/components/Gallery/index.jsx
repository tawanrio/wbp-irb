import Image from 'next/image'

export const Gallery = () => {
  const PHOTOS = [
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 232.88,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 278.92,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 269.63,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 411.6,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 420.08,
    },
  ]

  const PHOTOS_2 = [
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 120.03,
    },
    {
      src: '/images/pages/fabrica/gallery/photo_7.jpg',
      alt: 'Photo',
      width: 405.03,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 334.23,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 195.86,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 346.31,
    },
    {
      src: '/images/pages/fabrica/gallery/background.jpg',
      alt: 'Photo',
      width: 146.84,
    },
  ]

  return (
    <>
      <ul className="mx-auto flex w-full max-w-[1600px] gap-2.5">
        {PHOTOS.map((photo, index) => (
          <li
            key={index}
            className="h-full max-h-[346.61px] w-full"
            style={{ maxWidth: photo.width }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={346.61}
              className="h-screen max-h-[346.61px] w-full object-cover"
              style={{ maxWidth: photo.width }}
            />
          </li>
        ))}
      </ul>
      <ul className="mx-auto mt-2.5 flex w-full max-w-[1600px] gap-2.5">
        {PHOTOS_2.map((photo, index) => (
          <li
            key={index}
            className="h-full max-h-[346.61px] w-full"
            style={{ maxWidth: photo.width }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={346.61}
              className="h-screen max-h-[346.61px] w-full object-cover"
              style={{ maxWidth: photo.width }}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
