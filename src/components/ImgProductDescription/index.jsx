
import Image from "next/image"
import SectionTitle from "../SectionTitle"
import dynamic from 'next/dynamic'
import Details from "../Details"
import Link from "next/link"
 
// const InsertText = dynamic(() => import('@/components/InserText'), { ssr: false })

export default function ImgProductDescription({image, description, title, button }) {
    return (
        <>
         <article className="flex flex-col items-center " id={`content-img-description_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4 flex flex-col md:justify-between md:gap-10">
            {title && <SectionTitle title={title} />}
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
                    h-[100px]
                    relative
                    group
                    ">
                        <div 
                        style={{borderRadius: '20px'}}
                        className="
                         overflow-hidden
                         md:min-w-[380px]
                         h-full
                         group-hover:scale-105
                         
                         duration-700
                        ">
                            <div className="relative">
                            {/* <div className="
                        z-90
                        w-full 
                        absolute 
                        md:min-h-[400px] 
                        min-h-[100px]
                        bg-[#0a0a0aa3]
                        flex
                        z-[99]
                        justify-center
                        items-center
                        uppercase
                        text-white
                        font-bold
                        text-2xl
                        ">{content?.titleImg}</div> */}
                        <Image
                        src={image.imageUrl}
                        fill
                        sizes="100vw"
                        quality={100}
                        alt={image.alt}
                        className="
                        h-full
                        md:min-h-[400px]
                        min-h-[100px]

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
                        {/* {content?.imageSobre && (
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
                        )} */}
                    </div>
                    <div className="
                    md:w-2/3
                    w-full
                    flex 
                    flex-col  
                    overflow-auto
                    overflow-x-hidden
                    max-h-[450px]
                    gap-8
                    ">
                        <Details content={description} datetime="2016-10-25" suppressHydrationWarning />
                        {button && <Link target="_blank" href={button.link} className="rounded-xl text-white font-semibold bg-[#68b1e9] w-[180px] text-center mt-4 px-4 py-2 ">{button.title}</Link>}
                    </div>
                </div>
            </div>
        </article>
        </>
    )
}