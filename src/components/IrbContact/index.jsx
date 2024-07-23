/* eslint-disable @next/next/no-img-element */
import Description from '../Description'
import Button from '../Button'
import imgCallCenter from '../../../public/images/pages/contact/call-center.jpg'

export default function ProductFaq({
  logo,
  contentDescription,
  title,
  whatsapp,
  phone,
}) {
  return (
    <section className="flex flex-col items-center" id="irb-contact_">
      <div className="flex w-full max-w-7xl flex-col px-6 pt-6 md:gap-10 md:px-14 md:pb-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          <figure className="mx-auto flex max-h-80 w-full max-w-[27.5rem] flex-col flex-wrap justify-center overflow-hidden rounded-lg md:w-[27.5rem]">
            <img
              src={imgCallCenter.src}
              alt={logo.alt}
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="w-full lg:w-7/12">
            <h2 className="mb-5 text-2xl font-bold uppercase text-[#666]">
              {title}
            </h2>
            <Description content={contentDescription} />
            <div className="my-8 flex flex-col flex-wrap gap-8 md:flex-row">
              {whatsapp && <Button whatsapp={whatsapp} />}
              {phone && <Button phone={phone} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
