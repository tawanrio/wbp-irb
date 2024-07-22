import Image from 'next/image'

export default function ImageBanner({ banner, controllerBanner }) {
  return (
    <div style={{ height: controllerBanner?.size }}>
      <Image
        className="object-cover"
        quality={100}
        fill
        sizes="100vw"
        src={banner.url}
        alt={banner.alt}
      />
    </div>
  )
}
