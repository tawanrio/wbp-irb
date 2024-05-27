import CategoryCard from './CategoryCard';
import SectionTitle from '@/components/SectionTitle';

const CategoryGrid = ({ categories, title }) => {
  return (
    <section className="relative flex flex-col items-center mt-14" id="blog-carousel">
    <div className="w-full relative md:max-w-7xl flex-col md:px-14 md:mb-10 my-4 px-6 flex max-w-lg">
   <SectionTitle title={"Nossa Linha De Produtos"} line/>
    <div className="container mx-auto py-10 my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.slice(0, 6).map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
    </div>
    </section>
  );
};

export default CategoryGrid;
