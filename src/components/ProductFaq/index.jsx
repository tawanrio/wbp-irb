import SectionTitle from "../SectionTitle"
import ProductsCard from "../Products/components/ProductsCard"
import FaqItem from "../Faq/components/FaqItem"

export default function ProductFaq({products, faq, baseUrl}) {
    return (
        <section className="flex flex-col items-center " id={`product-faq_${crypto.randomUUID().slice(-8)}`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4  flex flex-col md:gap-10">
                <div className="
                flex
                md:flex-row
                flex-col
                gap-10
                ">
                    <div className="
                    flex
                    flex-col
                    md:w-7/12
                    w-12/12
                    flex-wrap
                    
                    ">
                         <SectionTitle title={'Produtos'} className="md:mb-5"/>
                         <div className=" my-8 ">
                            <ProductsCard products={products} cards={products.collection} baseUrl={baseUrl} textSize={'md:text-[1.2rem'} />
                         </div>
                    </div>
                    <div className="
                    w-12/12
                    md:w-4/12
                    ">
                        <SectionTitle title={'Faq'} className="mb-5" />
                        <div className="
                            flex 
                            w-full 
                            flex-col
                            gap-5
                            md:py-6
                            my-8
                            ">
                        
                            <FaqItem fId={'f01'} item={faq.items[0]} colors={faq.colors} climb={'line-clamp-1'} />
                            <FaqItem fId={'f02'} item={faq.items[1]} colors={faq.colors} climb={'line-clamp-1'} />
                            <FaqItem fId={'f03'} item={faq.items[2]} colors={faq.colors} climb={'line-clamp-1'} />
                            <FaqItem fId={'f03'} item={faq.items[2]} colors={faq.colors} climb={'line-clamp-1'} />
                </div>
                    </div>
                </div>
            </div>
        </section>
    )
}