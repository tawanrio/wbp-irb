import { Utility } from './Utility'
import { OPTIONS, UTILITIES_CARDS } from '@/utils/constants'
import { CarouselLoop } from '@/components/Carousel/CarouselLoop'
import { cn } from '@/lib/utils'

export const Utilities = ({ utilities, className }) => {
  return (
    <section
      id="blog-carousel"
      className={cn(
        'relative mx-auto mb-6 flex w-full max-w-[1540px] flex-col items-center px-6 pt-16 md:mb-0 md:px-14',
        className,
      )}
    >
      {utilities?.length > 0 ? (
        <CarouselLoop options={OPTIONS} array={utilities}>
          {utilities.map((utility, index) => (
            <li className="embla__slide_loop" key={index}>
              <Utility utility={utility} />
            </li>
          ))}
        </CarouselLoop>
      ) : (
        <CarouselLoop options={OPTIONS} array={UTILITIES_CARDS}>
          {UTILITIES_CARDS.map((utility, index) => (
            <li className="embla__slide_loop" key={index}>
              <Utility utility={utility} />
            </li>
          ))}
        </CarouselLoop>
      )}
    </section>
  )
}
