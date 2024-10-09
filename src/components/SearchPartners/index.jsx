import Collections from './components/Collections'

export default function SearchPartners({
  partnerType,
  collections,
  products,
  arrRoute,
  hiddenProductSearch,
  geo,
}) {
  return (
    <article
      className="flex flex-col items-center"
      id="content-img-description_"
    >
      <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:my-10 md:justify-between md:gap-10 md:px-14">
        {collections.length > 0 ? (
          <Collections
            collections={collections}
            products={products}
            arrRoute={arrRoute}
            hiddenProductSearch={hiddenProductSearch}
            geo={geo}
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
