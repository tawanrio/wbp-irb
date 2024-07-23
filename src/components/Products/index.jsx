import SectionTitle from '../SectionTitle'
import ProductsCard from './components/ProductsCard'
import PageProductsCard from './components/PageProductsCard'

export default function Products({
  products,
  title,
  baseUrl,
  baseUrlGeo,
  page,
  colors,
  heightCard,
}) {
  return (
    <section className="flex flex-col items-center" id={`products_`}>
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14">
        {title && (
          <SectionTitle title={'Nossa Linha De Produtos' || title} line />
        )}
        <div className="my-2 flex flex-wrap justify-between gap-8">
          {page ? (
            <>
              <PageProductsCard
                colors={colors}
                products={products}
                baseUrlGeo={baseUrlGeo}
                baseUrl={baseUrl}
                textSize={'md:text-2xl'}
              />
            </>
          ) : (
            <ProductsCard
              colors={colors}
              products={products}
              baseUrlGeo={baseUrlGeo}
              baseUrl={baseUrl}
              textSize={'md:text-lg'}
              heightCard={heightCard}
            />
          )}
        </div>
      </div>
    </section>
  )
}
