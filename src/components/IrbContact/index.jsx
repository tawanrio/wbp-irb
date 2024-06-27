import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Description from "../Description"
import Button from "../Button"

export default function ProductFaq({ logo, contentDescription, title, whatsapp, phone }) {
   


    return (
        <section className="flex flex-col items-center " id={`irb-contact_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10  flex flex-col md:gap-10">
                <div className="
                flex
                md:flex-row
                flex-col
                gap-10
                ">
                    <div className="
                    flex
                    flex-col
                    md:w-4/12
                    w-12/12
                    flex-1
                    flex-wrap
                    justify-center
                    ">
                        <div className=" hidden md:block relative items-center ">
                            {/* <Image
                                src={logo?.url}
                                alt={logo?.alt}
                                sizes="100vw"
                                quality={80}
                                fill
                            /> */}
                            <img src={logo?.url} alt={logo.alt} className="w-full" />
                        </div>
                    </div>
                    <div className="
                    w-12/12
                    md:w-7/12
                    ">
                        <h2 className="text-2xl font-bold text-[#666] mb-5 uppercase">{title}</h2>
                        <Description content={contentDescription} />
                        <div className="flex md:flex-row flex-col gap-8 my-8">
                            {whatsapp && <Button  whatsapp={whatsapp} />}
                            {phone && <Button  phone={phone} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}