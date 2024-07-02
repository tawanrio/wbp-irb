import Image from "next/image";
import SectionTitle from "../../../../SectionTitle";
import InsertText from "@/components/InserText";
import dynamic from 'next/dynamic';

// const InsertText = dynamic(() => import('@/components/InserText'), { ssr: false });

export default function ContentImgHTMLDesc({ textHTML, image }) {
    return (
        <>
            <article className="flex flex-col items-center " id={`content-img-description_`}>
                <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4 flex flex-col md:justify-between md:gap-10">
                    <div className="md:flex-row flex-col flex justify-between md:gap-14 gap-8 md:my-6 mt-8">
                        <div className="md:h-[400px] h-[300px] relative group">
                            <div
                                // style={{ borderRadius: content?.image.borderRadius }}
                                className="overflow-hidden md:min-w-[380px] h-full group-hover:scale-105 duration-700"
                            >
                                <div className="relative">
                                    {image.title && (<div className="
                                        z-90
                                        w-full 
                                        absolute 
                                        md:min-h-[400px] 
                                        min-h-[300px]
                                        bg-[#0a0a0aa3]
                                        flex
                                        z-[99]
                                        justify-center
                                        items-center
                                        uppercase
                                        text-white
                                        font-bold
                                        text-2xl
                                    ">{image.title}</div>)}
                                    <Image
                                        src={image.imageUrl}
                                        fill
                                        sizes="100vw"
                                        alt={image.alt}
                                        quality={100}
                                        className="
                                            h-full
                                            md:min-h-[400px]
                                            min-h-[300px]
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
                        </div>
                        <div className="md:w-2/3 w-full flex flex-col gap-8">
                            <div dangerouslySetInnerHTML={{ __html: textHTML }} className=" md:text-lg
            text-base
            flex
            mb-2
            font-[400]
            text-justify
            text-[#666]"></div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
