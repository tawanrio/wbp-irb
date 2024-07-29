/* eslint-disable @typescript-eslint/no-unused-vars */
import CategoryCard from './CategoryCard'
import SectionTitle from '@/components/SectionTitle'

const CategoryGrid = ({ categories, title }) => {
  return (
    <section
      className="relative mt-14 flex flex-col items-center"
      id="blog-carousel"
    >
      <div className="relative my-4 flex w-full max-w-lg flex-col px-6 md:mb-0 md:max-w-7xl md:px-14">
        <SectionTitle title={title} line />
        <div className="container mx-auto my-5 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
