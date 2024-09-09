import { SingleUtility } from './SingleUtility'
import { OPTIONS, UTILITIES_CARDS } from '@/utils/constants'
import { CarouselLoop } from '@/components/Carousel/CarouselLoop'

const UtilityCards = () => {
  return (
    <section
      id="blog-carousel"
      className="relative mx-auto mb-4 mt-14 flex w-full max-w-[1540px] flex-col items-center px-6 py-4 md:mb-0 md:px-14"
    >
      <CarouselLoop options={OPTIONS}>
        {UTILITIES_CARDS.map((utility, index) => (
          <li className="embla__slide_loop" key={index}>
            <SingleUtility
              utility={utility}
              className="embla__slide__number_loop"
            />
          </li>
        ))}
      </CarouselLoop>
    </section>
  )
}

export default UtilityCards
