import { cn } from '@/lib/utils'
import React from 'react'

export const Title = ({ tag, className, children }) => {
  return React.createElement(
    tag,
    {
      className: cn(
        "text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-5 font-['Libre_Baskerville'] font-bold text-[#213271]",
        className,
      ),
    },
    children,
  )
}
