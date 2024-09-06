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
        background: colors.bg,
        color: colors.text,
      }}
      className="z-[99] hidden text-sm md:absolute md:overflow-hidden md:rounded-2xl md:py-2 md:shadow-[0_10px_15px_-10px_rgba(0,0,0,.8)] md:group-hover:block"
    >
      {submenu.map((submenuItem, sId) => (
        <div key={submenuItem.label || 's' + sId} className="w-full">
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
            className="flex w-full justify-end whitespace-nowrap px-5 py-1 text-end duration-500 md:justify-start md:text-start md:text-base"
          >
            {submenuItem.label || 'Submenu Item'}
          </Link>
        </div>
      ))}
    </div>
  )
}
