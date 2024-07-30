/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'

export default function ServicesOverview({ content, certificate }) {
  return (
    <section className="relative flex flex-col items-center" id="blog-carousel">
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between gap-4 px-6 md:my-7 md:gap-10 md:px-14">
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          {content.map((card, index) => (
            <div key={index} className="flex w-full flex-col gap-4 md:w-1/3">
              <div className="card flex h-44 flex-1 flex-col items-center rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold uppercase text-[#AF231C]">
                  {card.title}
                </h3>
                <p className="text-center text-lg text-[#666]">
                  {card.description}
                </p>
              </div>
              <div className="flex">
                {/* Adicione aqui o conteúdo adicional dentro do segundo div */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {certificate?.map((icon, indexIcon) => (
            <div key={indexIcon} className="relative h-24 w-1/2 md:w-1/5">
              <Image
                src={icon.url}
                alt={icon.alt}
                fill
                sizes="100%"
                quality={100}
                className={`!h-[80px] object-contain p-0 ${icon.bg ? 'my-1 !h-[70px] rounded-md bg-[#AF231C] !p-1' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
