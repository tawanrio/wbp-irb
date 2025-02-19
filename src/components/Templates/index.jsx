import { ToastContainer } from 'react-toastify'
import Copyright from './Copyright'
import Footer from './Footer'
import Header from './Header'
import { insertMenuInTemplate } from '@/utils/functions'
import { CookiePopup } from '../CookiePopup'
import LanguageSwitcher from './LanguageSwitcher'

export default function Templates({ children, template, page, menus }) {
  const REDESIGN_PAGES = [
    'home',
    'fabrica',
    'distribuidoras',
    'autopecas',
    'mecanicas',
    'contato',
    'registre-se',
    'baixe-nosso-app',
    'produtos',
    'blog',
    'educacional',
    'error',
  ]

  const pageLabel = page?.label?.toLowerCase() || ''
  const isRedesignPage = REDESIGN_PAGES.includes(pageLabel)

  const isHome = isRedesignPage ? 'redesign-home' : 'default'
  const isHomeHeader = isRedesignPage ? 'header-home' : 'header'

  const arrHeader = template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find((item) => item?.label === isHome)

  const footer = template?.find((item) => item?.label === 'footer')
  const copyright = template?.find((item) => item?.label === 'copyright')

  insertMenuInTemplate({
    menus,
    template,
    menuName: isHomeHeader,
    itemTemplateName: isHome,
    templateName: 'header',
  })
  insertMenuInTemplate({
    menus,
    menuName: 'contactline',
    template,
    itemTemplateName: 'default',
    templateName: 'contactline',
  })

  insertMenuInTemplate({
    menus,
    template,
    menuName: 'company',
    itemTemplateName: 'default',
    templateName: 'footer',
  })
  insertMenuInTemplate({
    menus,
    menuName: 'partners',
    template,
    itemTemplateName: 'default',
    templateName: 'footer',
  })
  insertMenuInTemplate({
    menus,
    template,
    menuName: 'products',
    itemTemplateName: 'default',
    templateName: 'footer',
  })

  return isRedesignPage ? (
    <>
      <CookiePopup />
      <ToastContainer />
      <LanguageSwitcher />
      <main>{children}</main>
    </>
  ) : (
    <>
      <CookiePopup />
      <ToastContainer />
      <LanguageSwitcher />
      <Header content={header} page={page?.label} />
      <main>{children}</main>
      <Footer content={footer} />
      <Copyright content={copyright} />
    </>
  )
}
