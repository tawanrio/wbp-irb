import Image from 'next/image'
import Link from 'next/link'
import SubMenu from '../SubMenu'

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
  const hasSubmenu = Object.prototype.hasOwnProperty.call(link, 'submenu')

  return (
    <div className="group z-50 flex w-full flex-col items-end uppercase md:inline-block md:w-auto">
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
        className="mx-1 flex w-full flex-row-reverse justify-start gap-3 px-4 py-2 font-medium duration-500 md:flex-row md:text-base"
      >
        <span>{link.label}</span>
        {hasSubmenu && (
          <Image
            src={dataHeader.nav[0].icon}
            alt={dataHeader.logo.alt}
            width={15}
            height={15}
            style={{
              ...(submenuOpen &&
                submenuOpen === link.label && {
                  transform: 'rotate(0deg)',
                }),
            }}
            className="rotate-[90deg] duration-500 md:rotate-[-90deg] md:group-hover:rotate-[0deg]"
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
