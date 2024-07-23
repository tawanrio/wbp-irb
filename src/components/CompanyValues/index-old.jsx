import Image from 'next/image'

export default function CompanyValues({ cards }) {
  return (
    <section className="flex flex-col items-center" id={`company-values_`}>
      <div className="my-4 flex w-full max-w-lg px-6 md:mb-10 md:max-w-7xl md:px-14">
        <div
          style={{ scrollSnapType: 'x mandatory' }}
          className="md:justify-between> scrollbar-hide flex w-full flex-nowrap justify-start gap-4 overflow-x-scroll p-5 md:p-0"
        >
          {cards?.map((card, cId) => {
            return (
              <div
                key={cId}
                style={{
                  background: card.colors.bg,
                  color: card.colors.text,
                  scrollSnapAlign: 'start',
                }}
                className={`flex min-w-[240px] flex-initial flex-col rounded-3xl pb-6 pt-4 shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)] md:w-full md:min-w-[250px] md:pb-10`}
              >
                <div className="relative flex items-end gap-6 px-5 pb-4 md:px-10 md:pb-7">
                  <div>
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={50}
                      height={50}
                      className="h-9 w-9 md:h-[50px] md:w-[50px]"
                    />
                  </div>
                  <h3 className="absolute right-0 w-full text-center text-2xl font-bold uppercase md:text-2xl">
                    {card.title}
                  </h3>
                </div>
                <div className="relative">
                  <hr className="border-2 border-t-0" />
                  <hr
                    style={{ borderColor: card.colors.hr }}
                    className="absolute z-50 w-1/3 translate-x-[200%] translate-y-[-2px] border-2 border-t-0"
                  />
                </div>
                <div className="mt-4 px-5 text-center font-light md:mt-8">
                  <span>{card.description}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
