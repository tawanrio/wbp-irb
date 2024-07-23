/* eslint-disable @typescript-eslint/no-unused-vars */
import SectionTitle from '../SectionTitle'
import ProductsCard from '../Products/components/ProductsCard'
import Address from '../Address'
import { sortByKey } from '@/utils/functions'
import CategoryGrid from '../CategoryGrid'

export default function ServiceAddress({ products, address }) {
  console.log(products)
  const sortedCategories = sortByKey(products, 'label')
  return (
    <section className="flex flex-col items-center" id={`service-address_`}>
      <div className="my-4 mb-14 flex w-full max-w-7xl flex-col md:mb-10 md:gap-10">
        <div className="flex flex-col gap-0 md:gap-10">
          <div className="w-12/12 px-6 md:px-14">
            <SectionTitle title={'Endereço'} className="mb-5" />
            <div className="flex w-full flex-col gap-5 md:py-0">
              <Address address={address} />
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            {/* <SectionTitle title={'Serviço / Produtos'} className="md:mb-5"/> */}
            <div className="my-1 md:h-max">
              {/* <ProductsCard products={products} limit={9} cards={products?.collection} textSize={'md:text-[1.2rem'}  heightCard={'!h-[95px]'}/> */}
              <CategoryGrid categories={sortedCategories} title />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
