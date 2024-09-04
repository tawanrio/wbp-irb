import { useRef } from 'react'
import { Product } from '../Product'
import { LinkRed } from '../LinkRed'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export const ListProduct = ({ categories }) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <section
      id="blog-carousel"
      className="relative mx-auto mt-20 flex w-full max-w-lg flex-col px-6 sm:mt-28 md:max-w-[1600px] md:px-14"
    >
      <LinkRed href="/" className="mx-auto w-full max-w-[281px]">
        Nossos Produtos
      </LinkRed>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="container mx-auto flex py-10"
      >
        <CarouselContent>
          {categories.slice(0, 6).map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Product key={category._id} category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <LinkRed
        href="/"
        className="mx-auto mb-14 mt-10 w-full max-w-[281px] sm:mt-20"
      >
        EngraxaMente
      </LinkRed>
    </section>
  )
}
