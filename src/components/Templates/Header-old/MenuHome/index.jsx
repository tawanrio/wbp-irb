/* eslint-disable no-dupe-keys */
/* eslint-disable no-prototype-builtins */
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function MenuDesktop({ content }) {
  const [isHovered, setIsHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const dataHeader = content
  const colors = content?.colors

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
      <div className="relative z-30 flex flex-row items-center justify-between px-6 py-3 md:mx-auto md:mt-14 md:min-h-[110px] md:w-full md:max-w-7xl md:flex-col md:items-start md:px-14 md:py-0">
        <Link
          href={dataHeader?.logo.route}
          className="relative z-10 h-14 w-20 md:my-7 md:h-24 md:w-[120px]"
        >
          <Image
            src={dataHeader?.logo.url}
            alt={dataHeader?.logo.alt}
            sizes="100vw"
            fill
            className="md:px-0"
          />
        </Link>
        <div className="z-10 flex flex-row md:w-2/3 md:flex-col">
          <div
            className="flex w-full cursor-pointer items-center justify-end gap-4 md:hidden"
            onClick={() => handleMenu()}
          >
            <span
              style={{ color: colors.text }}
              className="text-xl font-semibold capitalize"
            >
              Menu
            </span>
            <div className="relative w-5">
              <div
                style={{
                  ...(menuOpen && {
                    transform: 'translateY(8px)',
                    rotate: '45deg',
                  }),
                }}
                className="bar z-20 h-0 w-full border-b-2 border-white duration-300"
              ></div>
              <div
                style={{ ...(menuOpen && { opacity: '0' }) }}
                className="bar z-20 my-1 h-0 w-full border-b-2 border-white opacity-100 duration-200"
              ></div>
              <div
                style={{
                  ...(menuOpen && {
                    transform: 'translateY(-8px)',
                    rotate: '-45deg',
                  }),
                }}
                className="bar z-20 h-0 w-full border-b-2 border-white duration-300"
              ></div>
            </div>
          </div>
          <div
            style={{
              ...(menuOpen && { width: '100vw', opacity: '1', zIndex: '10' }),
              color: colors?.text,
            }}
            className="absolute right-0 z-0 mt-10 w-0 flex-col overflow-hidden bg-white p-4 pt-0 capitalize opacity-0 duration-300 md:relative md:z-20 md:mt-0 md:flex md:w-full md:flex-col md:items-start md:justify-center md:gap-0 md:bg-transparent md:p-0 md:opacity-100"
          >
            {dataHeader?.nav[0].links.map((page, lId) => (
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
                      ? {
                          background: colors?.hoverbg,
                          color: colors?.hovertext,
                        }
                      : ''),
                  }}
                  className="mx-1 flex w-full flex-row-reverse justify-start gap-3 px-4 py-2 font-medium text-black duration-300 md:mx-0 md:flex-row md:px-0 md:text-xl md:text-white md:group-hover:translate-x-5 md:group-hover:scale-[1.3]"
                >
                  <span>{page.label}</span>
                  {page.hasOwnProperty('submenu') && (
                    <Image
                      src={dataHeader?.nav.icon}
                      alt={dataHeader?.logo.alt}
                      width={15}
                      height={15}
                      style={{
                        ...(submenuOpen &&
                          submenuOpen === 'l' + lId && {
                            transform: 'rotate(0deg)',
                          }),
                      }}
                      className="rotate-[90deg] duration-300 md:!hidden md:rotate-[-90deg] md:group-hover:rotate-[0deg]"
                    />
                  )}
                </Link>
                {page.hasOwnProperty('submenu') && (
                  <div
                    style={{
                      ...(submenuOpen &&
                        submenuOpen === 'l' + lId && { display: 'block' }),
                      background: colors.bg,
                      color: colors?.text,
                      color: colors?.textSub || colors?.text,
                    }}
                    className="z-20 hidden w-full text-sm md:absolute md:!hidden md:w-1/2 md:overflow-hidden md:py-2 md:shadow-[0_10px_15px_-10px_rgba(0,0,0,.8)] md:group-hover:block"
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
                                  background: colors?.hoverbg,
                                  color: colors?.hovertext,
                                }
                              : ''),
                          }}
                          className="flex w-full justify-end px-5 py-1 text-end duration-300 md:justify-start md:text-start md:text-xl"
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
