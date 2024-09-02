import Logo from './components/Logo'
import Container from '@/components/Container'
import Nav from './components/Nav'

export default function Header({ content }) {
  return (
    <header className="mx-5">
      <Container className="h-[87px] !flex-row !items-center rounded-[35px] border-[1.58px] border-solid border-white !bg-[#D9D9D926] !py-4 shadow-[0px_0px_6.31px_#00000040]">
        <Logo content={content} />
        <Nav content={content} />
      </Container>
    </header>
  )
}
