import SectionTitle from '../SectionTitle'
import ProductsCard from '../Products/components/ProductsCard'
import FaqItem from '../Faq/components/FaqItem'

export default function ProductFaq({ products, faq, baseUrl }) {
  return (
    <section className="flex flex-col items-center" id={`product-faq_`}>
      <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-10 md:gap-10 md:px-14">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="w-12/12 flex flex-col flex-wrap md:w-7/12">
            <SectionTitle title={'Produtos'} className="md:mb-5" />
            <div className="my-8">
              <ProductsCard
                products={products}
                cards={products?.collection}
                baseUrl={baseUrl}
                textSize={'md:text-[1.2rem'}
                heightCard={'md:!h-[100px]'}
              />
            </div>
          </div>
          <div className="w-12/12 md:w-4/12">
            <SectionTitle title={'Faq'} className="mb-5" />
            <div className="my-8 flex w-full flex-col gap-5 md:py-6">
              <FaqItem
                fId={'f01'}
                item={faq?.items[0]}
                colors={faq?.colors}
                climb={'line-clamp-1'}
              />
              <FaqItem
                fId={'f02'}
                item={faq?.items[1]}
                colors={faq?.colors}
                climb={'line-clamp-1'}
              />
              <FaqItem
                fId={'f03'}
                item={faq?.items[2]}
                colors={faq?.colors}
                climb={'line-clamp-1'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
