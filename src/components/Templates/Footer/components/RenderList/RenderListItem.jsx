import Link from 'next/link';
import { useState, useContext } from 'react';
import { PageData } from '@/context/pageData';

export  function RenderListItem({name, href, liId}) {
  const [isHovered, setIsHovered] = useState(false);
  const { layouts } = useContext(PageData);
  const colors = layouts.footer.colors

  return (
    <>
      <li
        onMouseEnter={() => setIsHovered(liId)}
        onMouseLeave={() => setIsHovered(false)}
          style={{...isHovered && isHovered === liId &&{background:colors.hoverbg, color: colors.hovertext} }} className='
      first:font-bold
      first:uppercase
      md:text-xl
      text-sm
      ' ><Link
      href={href}
      className="
      "
      >{name}</Link></li>
    </>
  )
}