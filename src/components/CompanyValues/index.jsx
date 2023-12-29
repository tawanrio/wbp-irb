import Image from "next/image"

export default function CompanyValues({cards}) {
    
  return (
    <section className="flex flex-col items-center" id={`company-values_${crypto.randomUUID().slice(-8)}`}>
        <div className="w-full md:max-w-7xl md:px-14 md:my-10 my-4 px-6 flex max-w-lg ">

            <div 
            style={{scrollSnapType:'x mandatory'}}
            className="
            md:justify-between>
            flex 
            w-full
            overflow-x-scroll 
            flex-nowrap
            gap-4
            justify-start
            scrollbar-hide
            p-5
            ">

          
        {cards?.map((card, cId) => {
            return (
                <div key={cId} style={{background:card.colors.bg, color:card.colors.text, scrollSnapAlign: 'start'}} 
                className={`
                 md:w-full 
                md:max-w-[370px]
                md:min-w-[250px]
                min-w-[250px]
                flex 
                flex-initial
                flex-col 
                rounded-3xl
                shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)]
                pt-5
                md:pb-12
                pb-6
                `}>
                    <div className="
                        flex
                        items-end
                        gap-6
                        md:px-10
                        md:pb-9
                        pb-4
                        px-5
                        relative
                        
                    ">
                        <div>
                            <Image 
                            src={card.image} 
                            alt={card.title}
                            width={60}
                            height={60}
                            className="md:w-[60px] md:h-[60px] w-9 h-9"
                            />
                        </div>
                        <h3 className="
                        md:text-3xl 
                        text-2xl 
                        w-full 
                        font-bold 
                        right-0
                        text-center 
                        absolute 
                        uppercase">
                            {card.title}
                        </h3>
                    </div>
                   <div className="relative">
                        <hr
                           className="
                           border-2
                            border-t-0
                           "/>
                        <hr
                        style={{borderColor: card.colors.hr}}
                        className="
                        absolute
                        border-2
                        border-t-0
                        translate-y-[-2px]
                        translate-x-[200%]
                        z-50
                        w-1/3
                        " />
                   </div>
                    <div
                    className="
                    md:mt-8
                    mt-4
                    text-center
                    font-light
                    px-5
                    ">
                        <span>{card.description}</span>
                    </div>
                </div>
                )
            })}
            
            </div>
            </div>
    </section>
  )
}