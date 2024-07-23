import SectionTitle from '../SectionTitle'
import ProductsCard from './components/ProductsCard'
import PageProductsCard from './components/PageProductsCard'

export default function Products({ products, baseUrl, page }) {
  return (
    <section className="flex flex-col items-center" id={`products_`}>
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14">
        {!page && <SectionTitle title={products.title} line />}
        <div className="my-2 flex flex-wrap justify-between gap-8">
          {page ? (
            <PageProductsCard
              products={products}
              cards={products.collection}
              baseUrl={baseUrl}
              textSize={'md:text-2xl'}
            />
          ) : (
            <ProductsCard
              products={products}
              cards={products.collection}
              baseUrl={baseUrl}
              textSize={'md:text-2xl'}
            />
          )}
        </div>
      </div>
    </section>
  )
}
