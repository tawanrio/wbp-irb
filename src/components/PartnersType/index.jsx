/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import Image from 'next/image'
import SectionTitle from '../SectionTitle'
import Link from 'next/link'

export default function PartnersType({ title, partners, colors }) {
  return (
    <section className="flex flex-col items-center" id={`partners_`}>
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14">
        <div className="my-10 flex flex-col flex-wrap justify-center gap-5 md:my-2 md:gap-20">
          {partners.types?.map((partner, pId) => {
            if (partner.label != 'fabrica')
              return (
                <div key={pId}>
                  <div className="z-10 w-full text-end text-sm font-bold uppercase duration-700 group-hover:scale-[1.10] md:mb-2 md:text-3xl">
                    {partner.title}
                  </div>
                  <Link
                    href={'/' + partner.label}
                    className="group relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[90px_25px_90px_25px] shadow-[0px_0px_40px_-10px_rgba(0,0,0,1)] grayscale-[80%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0a98] before:content-[''] hover:shadow-[0px_0px_30px_3px_rgba(0,0,0,1)] hover:grayscale-[0%]"
                  >
                    <Image
                      fill
                      sizes="100vw"
                      src={partner.bgImage}
                      alt={partner.title}
                      className="object-cover duration-700"
                    />
                  </Link>
                </div>
              )
          })}
        </div>
      </div>
    </section>
  )
}
