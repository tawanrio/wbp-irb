/* eslint-disable prettier/prettier */
import { useState } from 'react'
import Link from 'next/link'

export function RenderListItem({ content, liId, colors }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li
      onMouseEnter={() => setIsHovered(liId)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...(isHovered &&
          isHovered === liId && {
          background: colors.hoverbg,
          color: colors.hovertext,
        }),
        ...(content?.title && {
          textTransform: 'uppercase',
          fontWeight: '800',
          marginTop: '10px',
        }),
      }}
      className="flex w-full rounded-md px-2"
    >
      <Link href={content.route.toLowerCase()} className=" ">
        {content.label}
      </Link>
    </li>
  )
}
