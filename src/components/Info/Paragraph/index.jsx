import React from 'react'

export const Paragraph = ({ tag, children }) => {
  return React.createElement(tag, {
    className: `text-base m-0 font-extralight text-[#0A0E1C] md:text-2xl ${tag === 'li' && 'list-disc'} tag-children`,
    dangerouslySetInnerHTML: { __html: children },
  })
}
