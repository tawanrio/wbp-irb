import Image from 'next/image'
import Link from 'next/link'

export const Banners = ({ banners }) => {
  return (
    <ul className="mx-auto flex w-full max-w-6xl flex-row flex-wrap items-center justify-center gap-6 px-5 pb-32 pt-16 sm:pb-52">
      {banners.map((banner, index) => (
        <li
          key={index}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Image src={banner.image} alt={banner.alt} width={350} height={342} />
          <Link
            href={banner.link}
            target={banner.target}
            rel={banner.target ? 'noopener' : undefined}
            className="rounded-full bg-[#213271] px-5 py-1 text-sm text-white shadow-[0px_3.91px_3.91px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-95"
          >
            {banner.linkText}
          </Link>
        </li>
      ))}
    </ul>
  )
}
