import { SingleUtility } from './SingleUtility'
import { OPTIONS, UNIQUE_UTILITIES_CARDS } from '@/utils/constants'
import { CarouselLoop } from '@/components/Carousel/CarouselLoop'

const UtilityCards = () => {
  return (
    <section
      id="blog-carousel"
      className="relative mx-auto mb-4 mt-14 flex w-full max-w-[1540px] flex-col items-center px-6 py-4 md:mb-0 md:px-14"
    >
      <CarouselLoop options={OPTIONS} array={UNIQUE_UTILITIES_CARDS}>
        {UNIQUE_UTILITIES_CARDS.map((utility, index) => (
          <li className="embla__slide_loop" key={index}>
            <SingleUtility utility={utility} />
          </li>
        ))}
      </CarouselLoop>
    </section>
  )
}

export default UtilityCards
