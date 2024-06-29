import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Description from "../Description"
import Button from "./Button"

export default function ProductFaq({ logo, contentDescription, title, arrButton }) {
   

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
                        <div className=" hidden md:block relative items-center h-2/3">
                            <Image
                                src={logo?.url}
                                alt={logo?.alt}
                                sizes="100vw"
                                quality={80}
                                fill
                            />
                        </div>
                    </div>
                    <div className="
                        w-12/12
                        md:w-7/12
                    ">
                        <h2 className="text-2xl font-bold text-[#666] mb-5 uppercase">{title}</h2>
                        <div className="flex flex-col gap-4">
                            <Description content={contentDescription} />
                        </div>
                        <div className="flex md:flex-row flex-col gap-8 mt-8">
                           {arrButton && arrButton.map((button, i) => {
                            if(button.status === true) return  (
                            <Button key={`btnContact${i}`} content={button}></Button>
                            )})}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}