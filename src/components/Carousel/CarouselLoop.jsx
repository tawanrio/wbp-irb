import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './CarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

export const CarouselLoop = (props) => {
  const { children, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla_loop">
      <div className="embla__viewport_loop" ref={emblaRef}>
        <ul className="embla__container_loop">{children}</ul>

        <div className="embla__buttons_loop">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}
