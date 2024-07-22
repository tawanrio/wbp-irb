import React from 'react'
import Menu from './Menu'
import MenuHome from './MenuHome'

export default function Header({ style, content, page }) {
  const size = page?.banners.size.height
  return (
    <>
      {style ? (
        <header
          style={{ height: size }}
          className="absolute my-10 w-full md:py-0"
        >
          <MenuHome content={content} />
        </header>
      ) : (
        <header className="my-5 md:my-0">
          <Menu content={content} />
        </header>
      )}
    </>
  )
}
