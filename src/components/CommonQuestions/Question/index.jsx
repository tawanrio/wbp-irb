import { cn } from '@/utils/cn'
import { Plus } from 'lucide-react'

export const Question = ({ index, faq, openDetailIndex, toggleDetail }) => {
  const { asking, answer } = faq

  return (
    <details
      className="flex cursor-pointer flex-col gap-2.5 rounded-[19.51px] border-2 border-solid border-[#FFFFFF76] bg-[#FFFFFF60] transition-all"
      open={openDetailIndex === index}
    >
      <summary
        onClick={(event) => toggleDetail(index, event)}
        className="hide-details-marker flex items-center justify-between gap-3 px-6 py-3 text-base font-medium sm:text-lg"
      >
        {asking}
        <Plus
          className={cn(
            'min-h-7 min-w-7 text-[#982225] transition-transform duration-200',
            openDetailIndex === index ? '-rotate-45' : '',
          )}
        />
      </summary>
      <p className="px-6 pb-6 pt-4 text-sm font-normal opacity-60 sm:text-base">
        {answer}
      </p>
    </details>
  )
}
