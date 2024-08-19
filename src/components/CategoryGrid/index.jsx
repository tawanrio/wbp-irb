import CategoryCard from './CategoryCard'
import SectionTitle from '@/components/SectionTitle'

const CategoryGrid = ({ categories, baseUrl }) => {
  return (
    <section
      id="blog-carousel"
      className="relative mx-auto mt-14 flex w-full max-w-lg flex-col px-6 md:mb-0 md:max-w-7xl md:px-14"
    >
      <SectionTitle title="Nossa Linha de Produtos" line />
      <ul className="container mx-auto my-5 grid grid-cols-1 gap-8 py-10 md:grid-cols-2 lg:grid-cols-3">
        {categories.slice(0, 6).map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            baseUrl={baseUrl}
          />
        ))}
      </ul>
    </section>
  )
}

export default CategoryGrid
