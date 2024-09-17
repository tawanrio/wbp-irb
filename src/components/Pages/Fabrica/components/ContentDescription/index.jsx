import { cn } from '@/lib/utils'
import Description from '@/components/Description'

export default function ContentDescription({ content, className }) {
  return (
    <article
      id="content-description_"
      className={cn(
        'mx-auto flex w-full max-w-[1058px] flex-col items-center gap-8 px-6 md:px-14',
        className,
      )}
    >
      <Description
        content={content}
        color="#fff"
        className="font-extralight sm:!text-xl"
      />
    </article>
  )
}
