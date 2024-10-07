import { cn } from '@/lib/utils'

export const Description = ({ description, className }) => {
  return (
    <p
      className={cn(
        'mx-auto w-full max-w-6xl px-5 pb-12 font-extralight text-white sm:pb-20 md:text-lg lg:text-xl',
        className,
      )}
    >
      {description}
    </p>
  )
}
