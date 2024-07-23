/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import SectionTitle from '../SectionTitle'
import Description from '../Description'
import Button from './Button'

export default function ProductFaq({
  logo,
  contentDescription,
  title,
  arrButton,
}) {
  return (
    <section className="flex flex-col items-center" id={`irb-contact_`}>
      <div className="flex w-full max-w-7xl flex-col px-6 md:my-10 md:gap-10 md:px-14">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="w-12/12 flex flex-1 flex-col flex-wrap justify-center md:w-4/12">
            <div className="relative hidden h-2/3 items-center md:block">
              <Image
                src={logo?.url}
                alt={logo?.alt}
                sizes="100vw"
                quality={80}
                fill
              />
            </div>
          </div>
          <div className="w-12/12 md:w-7/12">
            <h2 className="mb-5 text-2xl font-bold uppercase text-[#666]">
              {title}
            </h2>
            <div className="flex flex-col gap-4">
              <Description content={contentDescription} />
            </div>
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              {arrButton &&
                arrButton.map((button, i) => {
                  if (button.status === true)
                    return (
                      <Button key={`btnContact${i}`} content={button}></Button>
                    )
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
