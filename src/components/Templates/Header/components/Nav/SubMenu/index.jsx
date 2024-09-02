import Link from 'next/link'

export default function SubMenu({
  submenu,
  submenuOpen,
  isHovered,
  setIsHovered,
  handleMenu,
  colors,
}) {
  return (
    <div
      style={{
        ...(submenuOpen && { display: 'block' }),
        background: colors.bgSubmenu || colors.bg,
        color: colors.text,
      }}
      className="z-[99] hidden rounded-lg text-sm backdrop-blur-md lg:absolute lg:overflow-hidden lg:py-2 lg:shadow-[0_10px_15px_-10px_rgba(0,0,0,.8)] lg:group-hover:block"
    >
      {submenu.map((submenuItem, sId) => (
        <ul key={submenuItem.label || 's' + sId} className="w-full">
          <Link
            target={submenuItem?.blank}
            href={submenuItem.route || '/#'}
            onMouseEnter={() => setIsHovered('s' + sId)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleMenu}
            style={{
              ...(isHovered && isHovered === 's' + sId
                ? { background: colors.hoverbg, color: colors.hovertext }
                : ''),
            }}
            className="flex w-full justify-end whitespace-nowrap px-5 py-1 text-end duration-500 lg:justify-start lg:text-start lg:text-base"
          >
            {submenuItem.label || 'Submenu Item'}
          </Link>
        </ul>
      ))}
    </div>
  )
}
