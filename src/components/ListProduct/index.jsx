import { cn } from '@/utils/cn'
import { Product } from '../Product'
import { LinkRed } from '../LinkRed'

export const ListProduct = ({ categories }) => {
  const totalItems = categories.slice(0, 3).length
  const middleIndex = Math.floor(totalItems / 2)
  return (
    <section
      id="blog-carousel"
      className="relative mx-auto mt-28 flex w-full max-w-lg flex-col px-6 md:mb-0 md:max-w-[1600px] md:px-14"
    >
      <LinkRed href="/" className="mx-auto w-full max-w-[281px]">
        Nossos Produtos
      </LinkRed>
      <ul className="container mx-auto flex py-10">
        {categories.slice(0, 3).map((category, index) => (
          <Product
            key={category._id}
            category={category}
            className={cn(
              index === middleIndex - 1 || index === middleIndex + 1
                ? 'scale-75'
                : '',
            )}
          />
        ))}
      </ul>
    </section>
  )
}
