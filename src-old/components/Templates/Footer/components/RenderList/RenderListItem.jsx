import Link from 'next/link';
import { useState } from 'react';

export  function RenderListItem({content, liId, colors}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <li
        onMouseEnter={() => setIsHovered(liId)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...(isHovered && isHovered === liId && {
            background: colors.hoverbg,
            color: colors.hovertext,
          }),
          ...(content?.title && { textTransform: 'uppercase', fontWeight: 'bold', marginTop: '10px'}),
        }}
        className="
        w-full
        flex
        rounded-md
        px-2
        " ><Link
      href={content.route.toLowerCase()}
      className="
      "
      >{content.label}</Link></li>
    </>
  )
}