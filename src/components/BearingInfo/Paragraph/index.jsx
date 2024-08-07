import React from 'react'

export const Paragraph = ({ tag, children }) => {
  return React.createElement(
    tag,
    {
      className: `text-base font-normal text-[#666] md:text-lg ${tag === 'li' && 'list-disc'}`,
    },
    children,
  )
}
