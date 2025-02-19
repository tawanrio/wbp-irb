/* eslint-disable prettier/prettier */
import Image from 'next/image'
import Link from 'next/link'
import SubMenu from '../SubMenu'
import { cn } from '@/lib/utils'

export default function MenuItem({
  link,
  isHovered,
  setIsHovered,
  handleSubmenu,
  submenuOpen,
  colors,
  dataHeader,
  handleMenu,
}) {
  // const hasSubmenu = Object.prototype.hasOwnProperty.call(link, 'submenu')
  const hasSubmenu = Array.isArray(link.submenu) && link.submenu.length > 0

  return (
    <div className="group flex w-full flex-col items-end uppercase lg:inline-block lg:w-auto">
      <Link
        target={link?.blank}
        href={link.route || '/#'}
        onMouseEnter={() => setIsHovered(link.label)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(event) => handleSubmenu(event, link.label, hasSubmenu)}
        style={{
          ...(isHovered && !hasSubmenu && isHovered === link.label
            ? { background: colors.hoverbg, color: colors.hovertext }
            : ''),
        }}
        className="mx-1 flex w-full flex-row-reverse justify-start gap-3 px-4 py-2 font-medium duration-500 lg:flex-row lg:justify-center lg:rounded-full lg:text-base"
      >
        <span
          className={cn(
            link.label === 'Linhas de Produtos' && 'max-[520px]:w-min',
            ['Product Lines', 'Educational BR'].includes(link.label) && 'max-[455px]:w-min text-right')}
        >
          {link.label}
        </span>
        {hasSubmenu && (
          <Image
            src={dataHeader.nav[0].separateIcon}
            alt={dataHeader.nav[0].title}
            width={15}
            height={15}
            style={{
              ...(submenuOpen &&
                submenuOpen === link.label && {
                transform: 'rotate(0deg)',
              }),
            }}
            className="rotate-[90deg] duration-500 lg:rotate-[-90deg] lg:group-hover:rotate-[0deg]"
          />
        )}
      </Link>
      {hasSubmenu && (
        <SubMenu
          submenu={link.submenu}
          submenuOpen={submenuOpen === link.label}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          handleMenu={handleMenu}
          colors={colors}
        />
      )}
    </div>
  )
}
