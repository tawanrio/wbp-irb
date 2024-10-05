import { SingleUtility } from './SingleUtility'
import { OPTIONS, UNIQUE_UTILITIES_CARDS } from '@/utils/constants'
import { CarouselLoop } from '@/components/Carousel/CarouselLoop'
import { cn } from '@/lib/utils'

const UtilityCards = ({ className }) => {
  return (
    <section
      id="blog-carousel"
      className={cn(
        'relative mx-auto mb-6 flex w-full max-w-[1540px] flex-col items-center px-6 pt-16 md:mb-0 md:px-14',
        className,
      )}
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
