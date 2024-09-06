import { useState } from 'react'
import MenuItem from './MenuItem'
import Hamburguer from './Hamburger'
import { cn } from '@/utils/cn'

export default function Nav({ content }) {
  const [isHovered, setIsHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const dataHeader = content
  const colors = content?.colors

  const handleSubmenu = (event, key, submenu) => {
    submenu && event.preventDefault()
    submenuOpen ? setSubmenuOpen(false) : setSubmenuOpen(key)
  }

  const handleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false)
      setSubmenuOpen(false)
    } else {
      setMenuOpen(true)
    }
  }

  return (
    <>
      <Hamburguer menuOpen={menuOpen} handleMenu={handleMenu} colors={colors} />

      <nav
        style={{
          ...(menuOpen && { opacity: '1', zIndex: '10' }),
          background: menuOpen && colors.bg,
          color: colors.text,
        }}
        className={cn(
          'absolute right-14 top-24 !z-[999] mt-8 flex w-7/12 flex-col rounded-lg p-4 capitalize opacity-0 backdrop-blur-md duration-500 lg:relative lg:right-0 lg:top-0 lg:z-50 lg:mt-0 lg:w-full lg:flex-row lg:items-center lg:justify-end lg:gap-0 lg:p-0 lg:opacity-100 lg:backdrop-blur-none',
          menuOpen ? 'flex' : 'max-lg:hidden',
        )}
      >
        {dataHeader?.nav[0].links?.map((link, lId) => (
          <MenuItem
            key={'l' + lId}
            link={link}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            handleSubmenu={handleSubmenu}
            submenuOpen={submenuOpen}
            colors={colors}
            dataHeader={dataHeader}
            handleMenu={handleMenu}
          />
        ))}
      </nav>
    </>
  )
}
