import { BlogCard } from './BlogCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const BlogCarousel = ({ posts }) => {
  const currentPosts = posts.slice(0, 3)
  return (
    <section
      id="blog-carousel"
      className="mx-auto mb-4 flex w-full max-w-7xl flex-col items-center justify-between px-6 md:mb-32 md:gap-10 md:px-14"
    >
      <h2 className="m-0 w-full rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-lg font-normal uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)]">
        Últimas notícias
      </h2>

      <Carousel className="flex w-full gap-10 py-5 transition-transform duration-500 ease-in-out">
        <CarouselContent>
          {currentPosts.map((post, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <BlogCard post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {currentPosts.length > 3 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </section>
  )
}
