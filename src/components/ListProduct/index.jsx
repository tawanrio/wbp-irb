import { useRef } from 'react'
import { Product } from '../Product'
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
      id="product-carousel"
      className="relative mx-auto mt-20 flex w-full max-w-lg flex-col px-6 sm:mt-28 md:max-w-[1600px] md:px-14"
    >
      <h2 className="mx-auto w-full max-w-[281px] rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-lg font-normal text-white shadow-[inset_0px_6.21px_5.5px_rgba(0,0,0,0.5)]">
        Nossos Produtos
      </h2>
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
    </section>
  )
}
