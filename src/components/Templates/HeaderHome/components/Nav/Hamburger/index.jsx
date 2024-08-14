import React from 'react'

export default function Hamburguer({ menuOpen, handleMenu }) {
  return (
    <>
      <div
        className="flex w-full cursor-pointer items-center justify-end gap-4 md:hidden"
        onClick={handleMenu}
      >
        <span className="text-xl font-semibold capitalize">Menu</span>
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
    </>
  )
}
