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
                md:gap-10
                gap-0
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
                         <div className=" my-1 ">
                            <ProductsCard products={products} limit={9} cards={products?.collection} textSize={'md:text-[1.2rem'}  heightCard={'!h-[95px]'}/>
                         </div>
                    </div>
                    <div className="border-l md:mt-20 md:mb-6 hidden md:block"></div>
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
                            md:py-0
                            ">
                            <Address address={address}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}