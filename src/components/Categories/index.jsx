import SectionTitle from "../SectionTitle"
import CategoriesCard from "./components/CategoriesCard"

export default function Products({categories, title, baseUrl,baseUrlGeo, page, colors, heightCard }) {
    return (
        <section className="flex flex-col items-center " id={`products_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-7 my-4  flex flex-col justify-between md:gap-10">
            {title && <SectionTitle title={"Nossa Linha De Produtos" ||title} line/>}
            <div className="
            flex
            gap-8
            justify-between
            flex-wrap
            my-2
            ">
           
                <CategoriesCard colors={colors} categories={categories} baseUrlGeo={baseUrlGeo} baseUrl={baseUrl} textSize={'md:text-lg'} heightCard={heightCard} />
       
            </div>
            </div>
        </section>
    )
}