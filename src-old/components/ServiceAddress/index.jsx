import SectionTitle from "../SectionTitle"
import ProductsCard from "../Products/components/ProductsCard"
import Address from "../Address"

export default function ServiceAddress({products, address}) {
    return (
        <section className="flex flex-col items-center " id={`service-address_`}>
            <div className="w-full max-w-7xl md:px-14 px-6  my-4 md:mb-10 mb-14 flex flex-col md:gap-10">
                <div className="
                flex
                md:flex-row
                flex-col
                gap-10
                ">
                    <div className="
                    flex
                    flex-col
                    flex-1
                    md:w-6/12
                    w-12/12
                    flex-wrap
                    ">
                         <SectionTitle title={'Serviço / Produtos'} className="md:mb-5"/>
                         <div className=" my-8 ">
                            <ProductsCard products={products} limit={9} cards={products?.collection} textSize={'md:text-[1.2rem'}  heightCard={'md:!h-[95px]'}/>
                         </div>
                    </div>
                    <div className="border-l mt-20 mb-6 hidden md:block"></div>
                    <div className="
                    w-12/12
                    md:w-5/12
                    ">
                        <SectionTitle title={'Endereço'} className="mb-5" />
                        <div className="
                            flex 
                            w-full 
                            flex-col
                            gap-5
                            md:py-8
                            ">
                            <Address address={address}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}