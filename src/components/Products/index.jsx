import SectionTitle from "../SectionTitle"
import ProductsCard from "./components/ProductsCard"

export default function Products({products , baseUrl}) {
    return (
        <section className="flex flex-col items-center " id={`products_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-7 my-4  flex flex-col justify-between md:gap-10">
            <SectionTitle title={products.title} line/>
            <div className="
            flex
            gap-8
            justify-between
            flex-wrap
            my-2
            ">

           <ProductsCard products={products} cards={products.collection} baseUrl={baseUrl} textSize={'md:text-2xl'}/>
            </div>
            </div>
        </section>
    )
}