/* eslint-disable @typescript-eslint/no-unused-vars */
import SectionTitle from '../SectionTitle'
import CategoriesCard from './components/CategoriesCard'

export default function Products({
  categories,
  title,
  baseUrl,
  baseUrlGeo,
  page,
  colors,
  heightCard,
}) {
  return (
    <section
      id="products_"
      className="mx-auto mb-4 mt-8 flex w-full max-w-7xl flex-col px-6 md:my-7 md:gap-10 md:px-14"
    >
      {title && (
        <SectionTitle title={'Nossa Linha De Produtos' || title} line />
      )}
      <ul className="mb-2 mt-6 flex flex-wrap justify-between gap-8">
        <CategoriesCard
          colors={colors}
          categories={categories}
          baseUrlGeo={baseUrlGeo}
          baseUrl={baseUrl}
          textSize={'md:text-lg'}
          heightCard={heightCard}
        />
      </ul>
    </section>
  )
}
