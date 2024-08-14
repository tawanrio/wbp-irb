import { useState } from 'react'
import MenuItem from './MenuItem'
import Hamburguer from './Hamburger'

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

      <div
        style={{
          ...(menuOpen && { opacity: '1', zIndex: '10' }),
          background: colors.bg,
          color: colors.text,
        }}
        className="absolute right-0 top-4 !z-[999] mt-8 flex w-[65%] flex-col p-4 pt-0 capitalize opacity-0 duration-500 md:relative md:top-0 md:z-50 md:mt-0 md:w-full md:flex-row md:items-center md:justify-end md:gap-0 md:p-0 md:opacity-100"
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
      </div>
    </>
  )
}
