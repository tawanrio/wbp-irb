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
}) {
  return (
    <article
      className="flex flex-col items-center"
      id={`content-img-description_`}
    >
      <div className="my-3 flex w-full max-w-7xl flex-col px-6 md:my-10 md:justify-between md:gap-6 md:px-14">
        {title && <SectionTitle title={title} line />}

        {products.length > 0 ? (
          <Collections
            collections={collections}
            products={products}
            arrRoute={arrRoute}
            hiddenProductSearch={hiddenProductSearch}
          />
        ) : (
          <h2 className="mb-[-25px] text-xl">Nenhum {arrRoute} Encontrado </h2>
        )}
      </div>
    </article>
  )
}
