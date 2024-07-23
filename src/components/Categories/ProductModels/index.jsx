import SectionTitle from '@/components/SectionTitle'
import ProductsCard from '../components/CategoriesCard'

export default function ModelsProduct({ products, cards, baseUrl, title }) {
  if (!products) return
  return (
    <section className="flex flex-col items-center" id={`products_`}>
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-10 md:gap-10 md:px-14">
        <SectionTitle title={title || products.title} line />
        <div className="my-10 flex flex-wrap justify-between gap-8 md:mx-7">
          <ProductsCard
            products={products}
            cards={cards}
            baseUrl={baseUrl}
            textSize={'md:text-[1.7rem]'}
          />
        </div>
      </div>
    </section>
  )
}
