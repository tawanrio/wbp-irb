import Image from 'next/image'
import galleryImage from '../../../../../../public/images/pages/about/gallery.png'

export const Gallery = () => {
  return (
    <Image
      src={galleryImage}
      alt="Gallery"
      width={1600}
      height={703.68}
      className="mx-auto"
    />
  )
}
