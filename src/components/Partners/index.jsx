import Image from 'next/image'
import SectionTitle from '../SectionTitle'
import Link from 'next/link'

export default function Parceiros({ title, partners, colors, hiddenTitle }) {
  return (
    <section className="flex flex-col items-center" id="partners_">
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14">
        {!hiddenTitle && <SectionTitle title={title} line />}
        <div className="my-10 flex flex-wrap justify-center gap-5 md:my-2 md:gap-8">
          {partners?.map((partner, pId) => (
            <Link
              key={pId}
              href={'/' + partner.label}
              className="group relative flex h-40 min-w-[16.875rem] flex-1 items-center justify-center overflow-hidden rounded-3xl grayscale-[80%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0ab4] before:content-[''] hover:scale-105 md:min-w-[20%]"
            >
              <div>
                <Image
                  fill
                  sizes="100vw"
                  src={partner.bgImage}
                  alt={partner.title}
                  className="h-[120%] object-cover duration-700 group-hover:h-[100%]"
                />
              </div>
              <div
                style={{
                  color: colors.text || '#fff',
                  textShadow: colors.border || '2px 2px 1px #000',
                }}
                className="absolute z-10 w-full text-center text-sm font-medium uppercase duration-700 group-hover:scale-[1.10] md:text-2xl"
              >
                {partner.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
