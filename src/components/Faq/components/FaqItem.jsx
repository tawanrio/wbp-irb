import { useState } from "react";
export default function FaqHtml({fId, item, colors, climb}) {
    const [faqOpen, setFaqOpen] = useState(false);

    function handleFaq(key){
        faqOpen ? setFaqOpen(false) : setFaqOpen(key);
    }
  return (
    <div key={'f'+fId} 
    onClick={() => handleFaq('f'+fId)}
    className="
    flex
    flex-wrap
    w-full
    cursor-pointer
    gap-2
    ">
        <div 
        style={{backgroundColor: colors.askingBg, color: colors.askingText}}
        className="
        flex 
        items-center
        w-full
        justify-between
        shadow-[0px_0px_15px_-13px_rgba(0,0,0,1)]
        p-4
        px-8
        ">
            <span 
            className={`
            md:text-xl
            w-10/12 
            font-medium 
            text-sm
            line-clamp-1
            
            ${climb}
            ${(faqOpen && faqOpen === 'f'+fId) && '!line-clamp-none'}
            `}>

            {item.asking}
            </span>
            <div className="relative w-4">
                <div 
                style={{...(faqOpen && faqOpen === 'f'+fId) && {transform:'translateY(0px)', rotate:'0deg'}}}
                className="w-full border-b-2 duration-500 my-1 z-20 border-black h-0 opacity-100 rotate-90 dura"></div>

                <div 
                 style={{...(faqOpen && faqOpen === 'f'+fId) && { opacity:0},transform:'translateY(-6px)'}}
                className="w-full border-b-2 duration-500 my-1 z-20 border-black h-0 opacity-100"></div>
            </div>
        </div>
        <div
         style={{backgroundColor: colors.answerBg, color: colors.answerText, ...(faqOpen && faqOpen === 'f'+fId) && {display:'flex'}}}
        className="
        p-4
        px-8
        hidden
        text-xs
        md:text-lg
        bg-zinc-50
        font-light
        shadow-[0px_0px_25px_-28px_rgba(0,0,0,1)]
        ">
            {item.answer}
        </div>
    </div>
  )
}