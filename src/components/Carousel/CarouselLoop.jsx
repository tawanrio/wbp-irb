import { cn } from '@/lib/utils'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

export const CarouselLoop = (props) => {
  const { children, options, array, className } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <section className={cn('embla_loop', className)}>
      <div className="embla__viewport_loop" ref={emblaRef}>
        <ul className="embla__container_loop">{children}</ul>

        {array.length > 1 && (
          <div className="embla__buttons_loop">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}
      </div>
    </section>
  )
}
