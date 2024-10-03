import React from 'react'

export const Title = ({ tag, children }) => {
  return React.createElement(
    tag,
    {
      className:
        "text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-5 font-['Libre_Baskerville'] font-bold text-[#213271]",
    },
    children,
  )
}
