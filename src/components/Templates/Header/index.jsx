import { useEffect, useState } from 'react'
import Logo from './components/Logo'
import Container from '@/components/Container'
import Nav from './components/Nav'

export default function Header({ content, page }) {
  const [headerFixed, setHeaderFixed] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth < 640)

      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 640)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setHeaderFixed(true)
      } else {
        setHeaderFixed(false)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  let styleHome
  let styleDefault

  if (page === 'home') {
    // Aplica diferentes estilos de acordo com o tamanho da tela
    content.colors.bg = !isSmallScreen ? 'transparent' : '#252525'
    content.colors.bgSubmenu = '#252525'
    content.colors.hoverbg = '#888888'
    content.colors.hovertext = '#fff'
    content.colors.text = '#fff'
    content.logo.url = '/images/templates/header/logo-white.svg'
    content.nav[0].icon = '/images/arrow-white.svg'

    styleHome = `absolute z-30 w-full transition-all duration-1000 ease-in-out`
    styleDefault = `fixed z-30 top-0 left-0 w-full !bg-[#252525] transition-all duration-1000 ease-in-out`
  }

  return (
    <header className={`${!headerFixed ? styleHome : styleDefault}`}>
      <Container
        className={`!flex-row !items-center rounded-2xl !py-4 ${
          page === 'home' && '!bg-transparent !py-2'
        } ${headerFixed && '!w-full'}`}
      >
        <Logo content={content} />
        <Nav content={content} />
      </Container>
    </header>
  )
}
