import React from 'react'

export const Paragraph = ({ tag, children }) => {
  return React.createElement(tag, {
    className: `text-base m-0 font-normal text-[#666] md:text-lg ${tag === 'li' && 'list-disc'} tag-children`,
    dangerouslySetInnerHTML: { __html: children },
  })
}
