import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Description from "../Description"
import Button from "../Button"

export default function ProductFaq({ data }) {
    return (
        <section className="flex flex-col items-center " id={`irb-contact_${crypto.randomUUID().slice(-8)}`}>
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
                    
                    ">
                        <div className=" hidden md:block  ">
                            <Image
                                src={data?.logo.url}
                                alt={data?.logo.alt}
                                width={200}
                                height={100}
                            />
                        </div>
                    </div>
                    <div className="
                    w-12/12
                    md:w-7/12
                    ">
                        <SectionTitle title={data?.title} className="mb-5" />
                        <Description content={data?.contentDescription} />
                        <div className="flex md:flex-row flex-col gap-8 my-8">
                            <Button data={data?.button.phone} />
                            <Button data={data?.button.whatsapp} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}