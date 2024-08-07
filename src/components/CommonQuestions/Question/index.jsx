import { cn } from '@/utils/cn'
import { Plus } from 'lucide-react'

export const Question = ({
  index,
  question,
  openDetailIndex,
  toggleDetail,
}) => {
  const { title, description } = question

  return (
    <details
      className="flex cursor-pointer flex-col gap-2.5 rounded-xl border border-solid border-black/30 transition-all"
      open={openDetailIndex === index}
    >
      <summary
        onClick={(event) => toggleDetail(index, event)}
        className="hide-details-marker flex items-center justify-between gap-3 p-6 text-base font-medium sm:text-lg"
      >
        {title}
        <Plus
          className={cn(
            'min-h-7 min-w-7 transition-transform duration-200',
            openDetailIndex === index ? '-rotate-45' : '',
          )}
        />
      </summary>
      <p className="px-6 pb-6 text-sm font-normal opacity-60 sm:text-base">
        {description}
      </p>
    </details>
  )
}
