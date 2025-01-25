/* eslint-disable @typescript-eslint/no-unused-vars */
import SectionTitle from '../SectionTitle'
import FilterPartners from './components/FilterPartners'
import Collections from './components/Collections'

export default function SearchPartners({
  partnerType,
  collections,
  products,
  arrRoute,
  hiddenProductSearch,
  title,
  geo,
}) {
  return (
    <article
      id="content-img-description_"
      className="flex flex-col items-center"
    >
      <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-10 md:justify-between md:gap-10 md:px-14">
        {collections.length > 0 ? (
          <Collections
            geo={geo}
            collections={collections}
            products={products}
            arrRoute={arrRoute}
            hiddenProductSearch={hiddenProductSearch}
          />
        ) : (
          <h2 className="mb-[-25px] text-xl">
            Nenhum {partnerType} Encontrado{' '}
          </h2>
        )}
      </div>
    </article>
  )
}
