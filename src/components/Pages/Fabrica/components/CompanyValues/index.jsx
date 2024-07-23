/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Description from '@/components/Description'
import SectionTitle from '@/components/SectionTitle'

export default function CompanyValues({ cards }) {
  return (
    <section className="mt-6 flex flex-col items-center" id={`company-values_`}>
      <div className="my-4 flex w-full max-w-lg flex-col px-6 md:mb-10 md:max-w-7xl md:gap-14 md:px-14">
        <SectionTitle title={'Missão, vísão e valores'} line />
        <div className="md:justify-between> scrollbar-hide flex w-full flex-col justify-start gap-4 p-5 md:flex-row md:p-0">
          <div className="flex w-full items-center md:w-1/2">
            <div
              style={{
                background: cards[0].colors.bg,
                color: cards[0].colors.text,
                scrollSnapAlign: 'start',
              }}
              className={`flex min-w-[240px] flex-initial flex-col rounded-3xl pb-6 pt-4 shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)] md:w-full md:min-w-[250px] md:pb-10`}
            >
              <div className="relative flex items-end gap-6 px-5 pb-4 md:px-10 md:pb-7">
                <div>
                  <Image
                    src={cards[0].image}
                    alt={cards[0].title}
                    width={50}
                    height={50}
                    className="h-9 w-9 md:h-[50px] md:w-[50px]"
                  />
                </div>
                <h3 className="absolute right-0 w-full text-center text-2xl font-bold uppercase md:text-2xl">
                  {cards[0].title}
                </h3>
              </div>
              <div className="relative">
                <hr className="border-2 border-t-0" />
                <hr
                  style={{ borderColor: cards[0].colors.hr }}
                  className="absolute z-50 w-1/3 translate-x-[200%] translate-y-[-2px] border-2 border-t-0"
                />
              </div>
              <div className="mt-4 px-5 text-center font-light md:mt-8">
                <span>
                  {' '}
                  {cards[0].description?.map((text, tId) => (
                    <p
                      key={tId}
                      id={`description_`}
                      className="mb-1 flex text-start text-base md:text-lg"
                    >
                      {text}
                    </p>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-7 md:w-1/2">
            <div
              style={{
                background: cards[1].colors.bg,
                color: cards[1].colors.text,
                scrollSnapAlign: 'start',
              }}
              className={`flex min-w-[240px] flex-initial flex-col rounded-3xl pb-6 pt-4 shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)] md:w-full md:min-w-[250px] md:pb-10`}
            >
              <div className="relative flex items-end gap-6 px-5 pb-4 md:px-10 md:pb-7">
                <div>
                  <Image
                    src={cards[1].image}
                    alt={cards[1].title}
                    width={50}
                    height={50}
                    className="h-9 w-9 md:h-[50px] md:w-[50px]"
                  />
                </div>
                <h3 className="absolute right-0 w-full text-center text-2xl font-bold uppercase md:text-2xl">
                  {cards[1].title}
                </h3>
              </div>
              <div className="relative">
                <hr className="border-2 border-t-0" />
                <hr
                  style={{ borderColor: cards[1].colors.hr }}
                  className="absolute z-50 w-1/3 translate-x-[200%] translate-y-[-2px] border-2 border-t-0"
                />
              </div>
              <div className="mt-4 px-5 text-center font-light md:mt-8">
                <span>
                  {' '}
                  {cards[1].description?.map((text, tId) => (
                    <p
                      key={tId}
                      id={`description_`}
                      className="flex text-center text-base md:text-lg"
                    >
                      {text}
                    </p>
                  ))}
                </span>
              </div>
            </div>
            <div
              style={{
                background: cards[2].colors.bg,
                color: cards[2].colors.text,
                scrollSnapAlign: 'start',
              }}
              className={`flex min-w-[240px] flex-initial flex-col rounded-3xl pb-6 pt-4 shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)] md:w-full md:min-w-[250px] md:pb-10`}
            >
              <div className="relative flex items-end gap-6 px-5 pb-4 md:px-10 md:pb-7">
                <div>
                  <Image
                    src={cards[2].image}
                    alt={cards[2].title}
                    width={50}
                    height={50}
                    className="h-9 w-9 md:h-[50px] md:w-[50px]"
                  />
                </div>
                <h3 className="absolute right-0 w-full text-center text-2xl font-bold uppercase md:text-2xl">
                  {cards[2].title}
                </h3>
              </div>
              <div className="relative">
                <hr className="border-2 border-t-0" />
                <hr
                  style={{ borderColor: cards[2].colors.hr }}
                  className="absolute z-50 w-1/3 translate-x-[200%] translate-y-[-2px] border-2 border-t-0"
                />
              </div>
              <div className="mt-4 px-5 text-center font-light md:mt-8">
                <span>
                  {' '}
                  {cards[2].description?.map((text, tId) => (
                    <p
                      key={tId}
                      id={`description_`}
                      className="flex text-center text-base md:text-lg"
                    >
                      {text}
                    </p>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
