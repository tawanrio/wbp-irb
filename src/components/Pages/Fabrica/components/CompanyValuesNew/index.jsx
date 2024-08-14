/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import { COMPANY_CORE_VALUES } from '@/utils/constants'
import { cn } from '@/utils/cn'

export default function CompanyValuesNew() {
  const [expandedCard, setExpandedCard] = useState(null)

  const handleMouseEnter = (index) => {
    setExpandedCard(index)
  }

  const handleMouseLeave = () => {
    setExpandedCard(null)
  }

  return (
    <section className="mt-6 flex flex-col items-center" id="company-values_">
      <div className="my-4 flex w-full max-w-lg flex-col px-6 md:mb-10 md:max-w-7xl md:gap-14 md:px-14">
        <SectionTitle title="Missão, visão e valores" line />
        <div className="scrollbar-hide flex w-full flex-col justify-start gap-4 p-5 md:flex-row md:justify-between md:p-0">
          <div className="flex w-full flex-col gap-5 lg:flex-row">
            {COMPANY_CORE_VALUES.map((card, index) => (
              <div
                key={index}
                style={{
                  background: card.colors.bg,
                  color: card.colors.text,
                  scrollSnapAlign: 'start',
                }}
                className={cn(
                  'group relative flex min-w-[240px] flex-initial cursor-pointer flex-col overflow-hidden rounded-3xl pb-6 pt-4 shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)] transition-all duration-500 ease-in-out md:w-full md:min-w-[250px] md:pb-10',
                  expandedCard === index
                    ? '!max-h-[500px]'
                    : 'max-h-[75px] md:max-h-[85px]',
                )}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <figure className="relative flex items-center px-5 pb-4 md:px-10 md:pb-7">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="size-9 md:size-12"
                  />
                  <figcaption className="right-0 w-full text-center text-xl font-bold uppercase">
                    {card.title}
                  </figcaption>
                </figure>
                <div className="relative opacity-100 transition-all duration-500 ease-in-out">
                  <div className="relative opacity-0 duration-1000 group-hover:opacity-100">
                    <hr className="border-2 border-t-0" />
                    <hr
                      style={{ borderColor: card.colors.hr }}
                      className="absolute z-50 w-1/3 translate-x-[200%] translate-y-[-2px] border-2 border-t-0"
                    />
                  </div>
                  <div
                    className="mt-4 transform bg-white px-5 text-center font-light transition-all duration-500 ease-in-out md:mt-8"
                    style={{
                      backgroundColor: card.colors.bg,
                      borderColor: card.colors.hr,
                      color: card.colors.text,
                    }}
                  >
                    <ul
                      className="list-inside opacity-0 duration-500 group-hover:opacity-100"
                      style={{ listStyle: card.content?.listStyle }}
                    >
                      {card.content.description?.map((text, tId) => (
                        <li
                          key={tId}
                          id="description_"
                          className={cn(
                            'mb-1 text-start text-base md:text-lg',
                            card.content?.listStyle !== 'none' && 'ml-6',
                          )}
                        >
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
