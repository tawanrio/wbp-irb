/* eslint-disable no-prototype-builtins */
import Image from 'next/image'
import { useContext, useState } from 'react'
import { PageData } from '@/context/pageData'
import Link from 'next/link'

export default function MenuDesktop() {
  const [isHovered, setIsHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const { layouts } = useContext(PageData)

  const dataHeader = layouts.header
  const colors = layouts.header.colors

  function handleSubmenu(event, key, submenu) {
    submenu && event.preventDefault()
    submenuOpen ? setSubmenuOpen(false) : setSubmenuOpen(key)
  }

  function handleMenu() {
    if (menuOpen) {
      setMenuOpen(false)
      setSubmenuOpen(false)
    } else {
      setMenuOpen(true)
    }
  }

  return (
    <>
      <div className="relative flex items-center justify-between px-6 md:mx-auto md:min-h-[110px] md:w-full md:max-w-7xl md:px-14">
        <Link href={dataHeader.logo.route} className="w-20 md:w-36">
          <Image
            src={dataHeader.logo.url}
            alt={dataHeader.logo.alt}
            width={130}
            height={120}
          />
        </Link>

        <div className="flex flex-col">
          <div
            className="flex w-full cursor-pointer items-center justify-end gap-4 md:hidden"
            onClick={() => handleMenu()}
          >
            <span className="text-xl font-semibold uppercase">Menu</span>
            <div className="relative w-5">
              <div
                style={{
                  ...(menuOpen && {
                    transform: 'translateY(8px)',
                    rotate: '45deg',
                  }),
                }}
                className="bar z-20 h-0 w-full border-b-2 border-black duration-500"
              ></div>
              <div
                style={{ ...(menuOpen && { opacity: '0' }) }}
                className="bar z-20 my-1 h-0 w-full border-b-2 border-black opacity-100 duration-200"
              ></div>
              <div
                style={{
                  ...(menuOpen && {
                    transform: 'translateY(-8px)',
                    rotate: '-45deg',
                  }),
                }}
                className="bar z-20 h-0 w-full border-b-2 border-black duration-500"
              ></div>
            </div>
          </div>
          <div
            style={{
              ...(menuOpen && { opacity: '1', zIndex: '10' }),
              background: colors.bg,
              color: colors.text,
            }}
            className="absolute right-0 z-0 mt-10 w-[65%] flex-col p-4 pt-0 uppercase opacity-0 duration-500 md:relative md:z-10 md:mt-0 md:w-full md:flex-row md:items-center md:justify-center md:gap-0 md:p-0 md:opacity-100"
          >
            {dataHeader.nav.links.map((page, lId) => (
              <ul
                key={'l' + lId}
                className="group flex w-full flex-col items-end md:inline-block md:w-auto"
              >
                <Link
                  href={page.route || '/#'}
                  key={page.label}
                  onMouseEnter={() => setIsHovered('l' + lId)}
                  onMouseLeave={() => {
                    setIsHovered(false)
                  }}
                  onClick={(event) =>
                    handleSubmenu(
                      event,
                      'l' + lId,
                      page.hasOwnProperty('submenu'),
                    )
                  }
                  style={{
                    ...(isHovered &&
                    !page.hasOwnProperty('submenu') &&
                    isHovered === 'l' + lId
                      ? { background: colors.hoverbg, color: colors.hovertext }
                      : ''),
                  }}
                  className="mx-1 flex w-full flex-row-reverse justify-start gap-3 px-4 py-2 font-semibold duration-500 md:flex-row md:text-xl"
                >
                  <span>{page.label}</span>
                  {page.hasOwnProperty('submenu') && (
                    <Image
                      src={dataHeader.nav.icon}
                      alt={dataHeader.logo.alt}
                      width={15}
                      height={15}
                      style={{
                        ...(submenuOpen &&
                          submenuOpen === 'l' + lId && {
                            transform: 'rotate(0deg)',
                          }),
                      }}
                      className="rotate-[90deg] duration-500 md:rotate-[-90deg] md:group-hover:rotate-[0deg]"
                    />
                  )}
                </Link>
                {page.hasOwnProperty('submenu') && (
                  <div
                    style={{
                      ...(submenuOpen &&
                        submenuOpen === 'l' + lId && { display: 'block' }),
                      background: colors.bg,
                      color: colors.text,
                    }}
                    className="z-20 hidden text-sm md:absolute md:overflow-hidden md:rounded-2xl md:py-2 md:shadow-[0_10px_15px_-10px_rgba(0,0,0,.8)] md:group-hover:block"
                  >
                    {page.submenu.map((submenu, sId) => (
                      <ul key={submenu.label || 's' + sId} className="w-full">
                        <Link
                          href={submenu.route || '/#'}
                          onMouseEnter={() => setIsHovered('s' + sId)}
                          onMouseLeave={() => setIsHovered(false)}
                          style={{
                            ...(isHovered && isHovered === 's' + sId
                              ? {
                                  background: colors.hoverbg,
                                  color: colors.hovertext,
                                }
                              : ''),
                          }}
                          className="flex w-full justify-end px-5 py-1 text-end duration-500 md:justify-start md:text-start md:text-xl"
                        >
                          {submenu.label || 'Submenu Item'}
                        </Link>
                      </ul>
                    ))}
                  </div>
                )}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
