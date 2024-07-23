import Image from 'next/image'
import Link from 'next/link'

export default function CardUtilsTwo({ content }) {
  return (
    <div className="flex min-h-[250px] min-w-[40%] flex-1 flex-col items-center justify-center gap-4 rounded-3xl duration-500 md:min-w-[45%]">
      <h2 className="text-xl font-bold text-[#666]">{content?.title}</h2>
      <div className="z-50 flex flex-col items-center gap-4 text-center text-[#666]">
        <span className="line-clamp-3 px-4 text-justify">
          {content?.description}
        </span>
      </div>
      <div className="group relative flex min-w-[100%] flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl py-10 grayscale-[50%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0aa3] before:content-[''] hover:grayscale-[100%] md:!min-h-[250px]">
        <Image
          fill
          sizes="100vw"
          src={content?.image}
          alt={'sda'}
          className="object-cover duration-700"
        />
      </div>
      <Link
        href={content?.link}
        className="hover:bg-[rgb(193, 32, 37)] w-1/3 cursor-pointer rounded-3xl border border-[#666] py-2 text-center text-[#666] duration-500 hover:scale-105"
      >
        {content?.linkText}
      </Link>
    </div>
  )
}
