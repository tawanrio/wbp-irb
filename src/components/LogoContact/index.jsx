/* eslint-disable @next/next/no-img-element */
import Description from '../Description'
import Button from './Button'

export default function ProductFaq({
  logo,
  contentDescription,
  title,
  arrButton,
}) {
  return (
    <section className="flex flex-col items-center" id="irb-contact_">
      <div className="flex w-full max-w-7xl flex-col px-6 pt-6 md:gap-10 md:px-14 md:pb-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          <figure className="mx-auto flex max-h-80 w-full max-w-[27.5rem] flex-col flex-wrap justify-center overflow-hidden rounded-lg md:w-[27.5rem]">
            <img
              src={logo?.url}
              alt={logo?.alt}
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="w-full lg:w-7/12">
            <h2 className="mb-5 text-2xl font-bold uppercase text-[#666]">
              {title}
            </h2>
            <div className="flex flex-col gap-4">
              <Description content={contentDescription} />
            </div>
            <div className="mt-8 flex flex-wrap gap-5 md:gap-8">
              {arrButton &&
                arrButton.map((button, i) => {
                  if (button.status === true)
                    return <Button key={`btnContact${i}`} content={button} />
                  return null
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
