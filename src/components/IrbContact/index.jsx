/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import SectionTitle from '../SectionTitle'
import Description from '../Description'
import Button from '../Button'

export default function ProductFaq({
  logo,
  contentDescription,
  title,
  whatsapp,
  phone,
}) {
  return (
    <section className="flex flex-col items-center" id={`irb-contact_`}>
      <div className="flex w-full max-w-7xl flex-col px-6 md:my-10 md:gap-10 md:px-14">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="w-12/12 flex flex-1 flex-col flex-wrap justify-center md:w-4/12">
            <div className="relative hidden items-center md:block">
              {/* <Image
                                src={logo?.url}
                                alt={logo?.alt}
                                sizes="100vw"
                                quality={80}
                                fill
                            /> */}
              <img src={logo?.url} alt={logo.alt} className="w-full" />
            </div>
          </div>
          <div className="w-12/12 md:w-7/12">
            <h2 className="mb-5 text-2xl font-bold uppercase text-[#666]">
              {title}
            </h2>
            <Description content={contentDescription} />
            <div className="my-8 flex flex-col gap-8 md:flex-row">
              {whatsapp && <Button whatsapp={whatsapp} />}
              {phone && <Button phone={phone} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
