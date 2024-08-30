import React from 'react'
import Logo from './components/Logo'
import Container from '@/components/Container'
import Nav from './components/Nav'

export default function Header({ content, page }) {
  // const size = page?.banners.size.height
  const styleHome = `absolute z-50 w-full`
  console.log(content.colors)

  return (
    <>
      <header className={`${page === 'home' && styleHome}`}>
        <Container className={'!flex-row !items-center !py-4'}>
          <Logo content={content} />
          <Nav content={content} />
        </Container>
      </header>
    </>
  )
}