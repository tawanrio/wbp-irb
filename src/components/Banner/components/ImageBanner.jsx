import Image from 'next/image'

export default function ImageBanner({ banner, controllerBanner }) {
  return (
    <figure style={{ height: controllerBanner?.size }}>
      <Image
        className="object-cover text-white"
        quality={100}
        fill
        sizes="100vw"
        src={banner.url}
        alt={banner.alt}
      />
    </figure>
  )
}
