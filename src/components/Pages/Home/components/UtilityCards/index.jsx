import { SingleUtility } from './SingleUtility'
import { UTILITIES_CARDS } from '@/utils/constants'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const UtilityCards = () => {
  return (
    <section
      id="blog-carousel"
      className="relative mx-auto mb-4 mt-14 flex w-full max-w-[1540px] flex-col items-center px-6 md:mb-0 md:px-14"
    >
      <Carousel className="container mx-auto flex py-4">
        <CarouselContent className="py-6">
          {UTILITIES_CARDS.map((utility, index) => (
            <CarouselItem key={index}>
              <SingleUtility utility={utility} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default UtilityCards
