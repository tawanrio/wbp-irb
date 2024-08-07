import React from 'react'

export const Title = ({ tag, children }) => {
  return React.createElement(
    tag,
    { className: 'text-2xl font-semibold text-[#666]' },
    children,
  )
}
