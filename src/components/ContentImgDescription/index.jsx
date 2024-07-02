
import Image from "next/image"
import SectionTitle from "../SectionTitle"
import InsertText from "@/components/InserText"
import dynamic from 'next/dynamic'
 
// const InsertText = dynamic(() => import('@/components/InserText'), { ssr: false })

export default function ContentImgDescription({content}) {
    return (
        <>
         <article className="flex flex-col items-center mb-[-30px] " id={`content-img-description_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4 flex flex-col md:justify-between md:gap-10">
               {content?.title && <SectionTitle title={content?.title} /> }
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
                    md:h-[400px]
                    h-[200px]
                    relative
                    group
                    ">
                        <div 
                        style={{borderRadius:content?.borderRadius}}
                        className="
                         overflow-hidden
                         md:min-w-[380px]
                         h-full
                         group-hover:scale-105
                         
                         duration-700
                        ">
                            <div className="relative">
                            <div className="
                        z-90
                        w-full 
                        absolute 
                        md:min-h-[400px] 
                        min-h-[200px]
                        bg-[#0a0a0aa3]
                        flex
                        z-[99]
                        justify-center
                        items-center
                        uppercase
                        text-white
                        font-bold
                        text-2xl
                        ">{content?.titleImg}</div>
                        <Image
                        src={content?.image}
                        fill
                        sizes="100vw"
                        alt="imagem"
                        quality={100}
                        className="
                        h-full
                        md:min-h-[400px]
                        min-h-[200px]

                        w-full
                        object-cover
                        scale-110
                        z-20
                        group-hover:scale-100
                        duration-1000
                        
                        "
                        />
                       
                        </div>
                        </div>
                        {content?.imageSobre && (
                            <div className="relative">
                            <Image
                            alt="imagem description"
                            src={content?.imageSobre}
                            fill
                            sizes="100vw"
                            quality={100}
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
                            </div>
                        )}
                    </div>
                    <div className="
                    md:w-2/3
                    w-full
                    flex 
                    flex-col  
                    gap-8
                    ">
                        <InsertText content={content?.description} datetime="2016-10-25" suppressHydrationWarning />
                    </div>
                </div>
            </div>
        </article>
        </>
    )
}