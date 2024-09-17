import { COMPANY_CORE_VALUES } from '@/utils/constants'
import Image from 'next/image'

export const CompanyValuesNew = () => {
  return (
    <section
      id="company-values_"
      className="mx-auto my-8 flex w-full max-w-7xl flex-row items-center px-6"
    >
      <ul className="flex w-full flex-row flex-wrap justify-center gap-8">
        {COMPANY_CORE_VALUES.map((card, index) => (
          <li
            key={index}
            className="min-h-[480.68px] w-full max-w-[364.82px] rounded-[25.22px] border border-solid border-[#FFFFFF4D] p-8 text-white"
          >
            <Image
              src={card.icon}
              alt={card.title}
              width={105.89}
              height={105.89}
              className="size-20 capitalize md:size-[105.89px]"
            />
            <h3 className="mt-5 text-4xl font-light uppercase tracking-[6%]">
              {card.title}
            </h3>
            <p className="line-clamp-5 text-xl font-extralight">
              {card.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
