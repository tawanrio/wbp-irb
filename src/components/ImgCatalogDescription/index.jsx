
import Image from "next/image"
import SectionTitle from "../SectionTitle"
import dynamic from 'next/dynamic'
import Details from "../Details"
import Link from "next/link"
 
// const InsertText = dynamic(() => import('@/components/InserText'), { ssr: false })

export default function imgCatalogDescription({content, className}) {
    return (
        <>
         <article className={`flex flex-col items-center ${className}`} id={`content-img-description_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-0 my-4 flex flex-col md:justify-between md:gap-6">
            {content?.title && <SectionTitle title={content?.title} />}
                <div
                    className="
                    md:flex-row
                    flex-col
                    flex
                    justify-start
                    md:gap-14
                    gap-8
                    md:mb-4
                    md:mt-0
                    mt-8
                    ">
                    <div
                    className="
                  
                    relative
                    group
                    ">
                        <div 
                        style={{borderRadius: '20px'}}
                        className="
                         overflow-hidden
                         md:min-w-[255px]
                         min-h-[100px]
                         h-[500px]
                         md:h-full
                         group-hover:scale-105
                         duration-700
                        ">
                            <div className=" 
                            relative  
                            h-full
                            ">
                        
                        {/* <Image
                        src={content?.imageProduct.imageUrl}
                        fill
                        sizes="100vw"
                        quality={100}
                        alt={content?.imageProduct.alt}
                        className="
                            z-20
                            group-hover:scale-100
                            duration-1000
                        "/> */}

                        <img src={content?.imageProduct.imageUrl} alt={content?.imageProduct.alt} className="h-[500px] w-64" />
                       
                        </div>
                        </div>
                       
                    </div>
                    <div className="
                    md:w-2/3
                    w-full
                    flex 
                    flex-col  
                    
                   gap-3
                    ">
                        <h3 className="text-2xl font-semibold text-[#666]">{content?.subtitle}</h3>
                        <Details content={content?.description} datetime="2016-10-25" suppressHydrationWarning />
                        <div className="flex gap-5">
                        <Link target="_blank" href={content?.button[0].link} className="rounded-xl text-white font-semibold w-[200px] text-center mt-4   ">
                            <div className="relative  h-[55px]">
                                <Image
                                 src={content?.button[0].image}
                                 fill
                                 sizes="100vw"
                                 quality={100}
                                 alt={content?.button[0].alt}
                                 className=""
                                />
                            </div>
                        </Link>

                        <Link target="_blank" href={content?.button[1].link} className="rounded-xl text-white font-semibold w-[200px] text-center mt-4 ">
                        <div className="relative h-[55px]">
                                <Image
                                 src={content?.button[1].image}
                                 fill
                                 sizes="100vw"
                                 quality={100}
                                 alt={content?.button[1].alt}
                                 className=""
                                />
                            </div>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </article>
        </>
    )
}