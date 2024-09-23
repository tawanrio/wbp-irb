import { useState } from 'react'
import { cn } from '@/utils/cn'
import { COMPANY_CORE_VALUES } from '@/utils/constants'
import Image from 'next/image'

export const CompanyValuesNew = () => {
  const [expandedCard, setExpandedCard] = useState(null)

  const handleMouseEnter = (index) => {
    setExpandedCard(index)
  }

  const handleMouseLeave = () => {
    setExpandedCard(null)
  }

  return (
    <section
      id="company-values_"
      className="mx-auto my-14 flex w-full max-w-7xl flex-row items-center px-6 md:px-14"
    >
      <ul className="flex w-full flex-col justify-center gap-8 lg:flex-row">
        {COMPANY_CORE_VALUES.map((card, index) => (
          <li
            key={index}
            style={{
              scrollSnapAlign: 'start',
            }}
            className={cn(
              'group relative flex min-w-[240px] flex-initial cursor-pointer flex-col overflow-hidden rounded-[21.58px] border border-solid border-[#FFFFFF4D] bg-[#D9D9D91A] pb-6 pt-2.5 transition-all duration-500 ease-in-out md:w-full md:min-w-[250px] md:pb-10',
              expandedCard === index
                ? '!max-h-[500px]'
                : 'max-h-[60px] md:max-h-[70px]',
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <figure className="relative flex items-center gap-6 px-6 pb-4 md:pb-7">
              <Image
                src={card.icon}
                alt={card.title}
                className="size-9 md:size-12"
                width={58.18}
                height={58.18}
              />
              <figcaption className="right-0 text-xl font-bold uppercase text-white">
                {card.title}
              </figcaption>
            </figure>
            <div className="relative opacity-100 transition-all duration-500 ease-in-out">
              <div className="mt-4 transform px-5 text-center font-light text-white transition-all duration-500 ease-in-out">
                <ul
                  className="list-inside opacity-0 duration-500 group-hover:opacity-100"
                  style={{ listStyle: card.content?.listStyle }}
                >
                  {card.content.description.map((text, tId) => (
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
          </li>
        ))}
      </ul>
    </section>
  )
}
