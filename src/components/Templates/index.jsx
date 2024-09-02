import { ToastContainer } from 'react-toastify'
import Copyright from './Copyright'
import Footer from './Footer'
import Header from './Header'
import { insertMenuInTemplate } from '@/utils/functions'
import { CookiePopup } from '../CookiePopup'
import { BackgroundImage } from '../BackgroundImage'

export default function Templates({ children, template, page, menus }) {
  const arrHeader = template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find((item) => item?.label === 'default')

  const footer = template?.find((item) => item?.label === 'footer')
  const copyright = template?.find((item) => item?.label === 'copyright')

  insertMenuInTemplate({
    menus,
    template,
    menuName: 'header',
    itemTemplateName: 'default',
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

  return (
    <>
      {page.label === 'home' ? (
        <>
          <CookiePopup />
          <ToastContainer />
          <BackgroundImage isHome>
            <Header content={header} page={page.label} />
          </BackgroundImage>
          <BackgroundImage>
            <main>{children}</main>
            <Footer content={footer} />
            <Copyright content={copyright} />
          </BackgroundImage>
        </>
      ) : (
        <>
          <CookiePopup />
          <ToastContainer />
          <Header content={header} page={page.label} />
          <main>{children}</main>
          <Footer content={footer} />
          <Copyright content={copyright} />
        </>
      )}
    </>
  )
}
