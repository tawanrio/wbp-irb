import Image from 'next/image'
import Link from 'next/link'

export default function CardUtilsFour({ content, blank }) {
  return (
    <div className="relative flex min-h-[250px] min-w-[100%] flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl px-6 duration-500 md:min-w-[45%] md:px-0">
      <h2 className="text-xl font-bold text-[#666]">{content?.title}</h2>
      <div className="group relative flex min-w-[90%] flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl py-10 grayscale-[80%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0acc] before:content-[''] md:!min-h-[250px]">
        <Image
          fill
          sizes="100vw"
          src={content?.image}
          alt={'sda'}
          className="h-[100%] object-cover"
        />
        <div className="z-50 flex flex-col items-center gap-4 px-10 text-center text-white">
          <span className="text-justify">{content?.description}</span>
        </div>
      </div>
      <Link
        target={blank}
        href={content?.link}
        className="mb-2 w-1/2 cursor-pointer rounded-3xl border border-[#666] py-2 text-center duration-500 hover:scale-105"
      >
        {content?.linkText}
      </Link>
    </div>
  )
}
