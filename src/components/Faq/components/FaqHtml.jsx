import FaqItem from "./FaqItem";

export default function FaqHtml({faq}) {
  return (
    <div className="
                flex 
                w-full 
                md:gap-10 
                gap-5 
                flex-col
                my-6
                
                md:flex-row
                ">
                    <div className="flex w-full flex-col gap-5 text-justify ">
                        {faq.items.map((item, fId) => !!(fId % 2 === 0) && (
                            <FaqItem key={fId} fId={fId} item={item} colors={faq.colors} />
                        )
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-5 text-justify">
                        {faq.items.map((item, fId) => !!(fId % 2 !== 0) && (
                            <FaqItem key={fId} fId={fId} item={item} colors={faq.colors} />
                        )
                        )}
                    </div>
                </div>
  )
}