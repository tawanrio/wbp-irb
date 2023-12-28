
import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Description from "../Description"

export default function ContentImgDescription({content}) {
    return (
        <>
         <article className="flex flex-col items-center " id={`content-img-description_${crypto.randomUUID().slice(-8)}`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4 flex flex-col md:justify-between md:gap-10">
                <SectionTitle title={content.title} line/>
                <div
                className="
                md:flex-row
                flex-col
                flex
                justify-between
                md:gap-14
                gap-8
                md:my-6
                mt-8
                ">
                    <div
                    className="
                    h-full
                    relative
                    group
                    
                    ">
                        <div 
                        style={{borderRadius:content.borderRadius}}
                        className="
                         overflow-hidden
                         md:min-w-[380px]
                         h-full
                         group-hover:scale-105
                         shadow-[0px_0px_40px_-10px_rgba(0,0,0,1)]
                         hover:shadow-[0px_0px_30px_3px_rgba(0,0,0,1)]
                         duration-700
                        ">
                        <Image
                        src={content.image}
                        width={400}
                        height={1500}
                        alt="image"
                        className="
                        h-full
                        md:min-h-[500px]
                        w-full
                        object-cover
                        scale-150
                        group-hover:scale-100
                        duration-1000
                        "
                        />
                        </div>
                        {content.imageSobre && (
                            <Image
                            src={content.imageSobre}
                            width={500}
                            height={1500}
                            className="
                           absolute
                           bottom-0
                           left-0
                           translate-x-[-50px]
                          scale-[1.10]
                          translate-y-[-23px]
                          group-hover:scale-[1.25]
                          group-hover:translate-y-[-43px]

                           duration-700
                            "
                            />
                        )}
                    </div>
                    <div className="
                    md:w-2/3
                    w-full
                    flex 
                    flex-col  
                    gap-8
                    ">
                        <Description content={content.description} />
                    </div>
                </div>
            </div>
        </article>
        </>
    )
}