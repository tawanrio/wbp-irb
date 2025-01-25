import { OPTIONS } from '@/utils/constants'
import { CarouselScale } from '../Carousel/CarouselScale'
import { Product } from '../Product'
import { useIntl } from 'react-intl'

export const ListProduct = ({ categories }) => {
  const intl = useIntl()
  const messages = intl.messages

  return (
    <section className="relative mx-auto mt-20 flex w-full max-w-lg flex-col px-6 sm:mt-28 md:max-w-[1600px] md:px-14">
      <h2 className="mx-auto w-full max-w-[281px] rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-lg font-normal text-white shadow-[inset_0px_6.21px_5.5px_rgba(0,0,0,0.5)]">
        {messages['component.home.product.title']}
      </h2>
      <CarouselScale options={OPTIONS} array={categories}>
        {categories.slice(0, 6).map((category) => (
          <li className="embla__slide" key={category._id}>
            <Product
              category={category}
              className="embla__slide__number border-[#FFFFFF4D] text-white"
            />
          </li>
        ))}
      </CarouselScale>
    </section>
  )
}
