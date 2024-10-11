import Logo from './components/Logo'
import Container from '@/components/Container'
import Nav from './components/Nav'

export default function Header({ content }) {
  return (
    <header className="-z-10 px-5 pb-4 pt-8 sm:pb-7 sm:pt-16">
      <Container className="relative z-10 h-[87px] w-full !flex-row !items-center justify-between rounded-[35px] border border-solid border-[#FFFFFF30] !bg-[#D9D9D926] !py-4 shadow-[0px_0px_6.31px_#00000040]">
        <Logo content={content} />
        <Nav content={content} />
      </Container>
    </header>
  )
}
