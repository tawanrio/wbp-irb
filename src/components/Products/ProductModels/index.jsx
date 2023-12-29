import SectionTitle from "@/components/SectionTitle"
import ProductsCard from "../components/ProductsCard"

export default function ModelsProduct({products, cards , baseUrl, title}) {
   if(!products) return
    return (

        <section className="flex flex-col items-center " id={`products_${crypto.randomUUID().slice(-8)}`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4  flex flex-col justify-between md:gap-10">
            <SectionTitle title={title || products.title} line/>
            <div className="
           md:mx-7
           flex
           gap-8
           justify-between
           flex-wrap
           my-10
            ">

           <ProductsCard products={products} cards={cards} baseUrl={baseUrl} textSize={'md:text-[1.7rem]'}/>
            </div>
            </div>
        </section>
    )
}