import React from 'react'

export default function Hamburguer({ menuOpen, handleMenu, colors }) {
  return (
    <>
      <div
        className="flex w-full cursor-pointer items-center justify-end gap-4 md:hidden"
        onClick={handleMenu}
      >
        <span
          className="text-xl font-semibold capitalize"
          style={{ color: colors.text }}
        >
          Menu
        </span>
        <div className="relative w-5">
          <div
            style={{
              borderColor: colors.text,
              ...(menuOpen && {
                transform: 'translateY(8px)',
                rotate: '45deg',
              }),
            }}
            className={`bar z-20 h-0 w-full border-b-2 duration-500`}
          ></div>
          <div
            style={{
              borderColor: colors.text,
              ...(menuOpen && { opacity: '0' }),
            }}
            className={`bar z-20 my-1 h-0 w-full border-b-2 opacity-100 duration-200`}
          ></div>
          <div
            style={{
              borderColor: colors.text,
              ...(menuOpen && {
                transform: 'translateY(-8px)',
                rotate: '-45deg',
              }),
            }}
            className={`bar z-20 h-0 w-full border-b-2 duration-500`}
          ></div>
        </div>
      </div>
    </>
  )
}
