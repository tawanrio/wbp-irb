
import Image from "next/image"
import SectionTitle from "../SectionTitle"
import Description from "../Description"

export default function ContentImgDescription({video, description}) {

    console.log(description);
    return (
        <>
         <article className="flex flex-col items-center " id={`content-img-description_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 md:my-0 md:mb-2 my-4 flex flex-col md:justify-between md:gap-10">
                <div
                className="
                md:flex-row
                flex-col
                flex
                justify-between
                md:gap-14
                gap-8
                md:my-2
                mt-8
                ">
                     <div className="
                    md:w-2/3
                    w-full
                    flex 
                    flex-col  
                    gap-8
                    ">
                        <Description content={description} size={'18px'}/>
                    </div>
                    <div
                    className="
                    relative
                    group
                    
                    ">
                        <div 
                        className="
                         overflow-hidden
                         duration-700
                         
                        ">
                       <video className="
                       w-full 
                       mt-2
                       shadow-[-20px_35px_90px_-30px_rgba(0,0,0,.8)]
                       "  
                       src={video?.url} controls width={800} height={600}/>
                        </div>
                      
                    </div>
                   
                </div>
            </div>
        </article>
        </>
    )
}