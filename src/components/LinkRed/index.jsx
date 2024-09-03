import { cn } from '@/utils/cn'
import Link from 'next/link'

export const LinkRed = ({ href, className, children }) => {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-lg font-normal capitalize text-white shadow-[inset_0px_6.21px_5.5px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-95',
        className,
      )}
    >
      {children}
    </Link>
  )
}
