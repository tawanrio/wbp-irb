import { useState } from 'react'

export default function FaqHtml({ fId, item, colors, climb }) {
  const [faqOpen, setFaqOpen] = useState(false)

  function handleFaq(key) {
    faqOpen ? setFaqOpen(false) : setFaqOpen(key)
  }
  return (
    <div
      key={'f' + fId}
      onClick={() => handleFaq('f' + fId)}
      className="flex w-full cursor-pointer flex-wrap gap-2"
    >
      <div
        style={{ backgroundColor: colors?.askingBg, color: colors?.askingText }}
        className="flex w-full items-center justify-between p-4 px-8 shadow-[0px_0px_15px_-13px_rgba(0,0,0,1)]"
      >
        <span
          style={{ color: '#666' }}
          className={`line-clamp-1 w-10/12 text-sm font-medium md:text-xl ${climb} ${faqOpen && faqOpen === 'f' + fId && '!line-clamp-none'} `}
        >
          {item?.asking}
        </span>
        <div className="relative w-4">
          <div
            style={{
              ...(faqOpen &&
                faqOpen === 'f' + fId && {
                  transform: 'translateY(0px)',
                  rotate: '0deg',
                }),
            }}
            className="dura z-20 my-1 h-0 w-full rotate-90 border-b-2 border-black opacity-100 duration-500"
          ></div>

          <div
            style={{
              ...(faqOpen && faqOpen === 'f' + fId && { opacity: 0 }),
              transform: 'translateY(-6px)',
            }}
            className="z-20 my-1 h-0 w-full border-b-2 border-black opacity-100 duration-500"
          ></div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: colors?.answerBg,
          color: '#666',
          ...(faqOpen && faqOpen === 'f' + fId && { display: 'flex' }),
        }}
        className="hidden bg-zinc-50 p-4 px-8 text-xs font-light shadow-[0px_0px_25px_-28px_rgba(0,0,0,1)] md:text-lg"
      >
        {item?.answer}
      </div>
    </div>
  )
}
