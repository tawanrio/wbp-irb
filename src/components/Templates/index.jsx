import { ToastContainer } from 'react-toastify'
import Copyright from './Copyright'
import Footer from './Footer'
import Header from './Header'
import { insertMenuInTemplate } from '@/utils/functions'
import { CookiePopup } from '../CookiePopup'

export default function Templates({ style, children, template, page, menus }) {
  style = style || 'default'
  const arrHeader = template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find((item) => item?.label === style)

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
  insertMenuInTemplate({
    menus,
    template,
    menuName: 'company',
    itemTemplateName: 'default',
    templateName: 'footer',
  })

  return (
    <>
      <Header content={header} page={page} />
      <CookiePopup />
      <ToastContainer />
      <main>{children}</main>
      <Footer content={footer} />
      <Copyright content={copyright} />
    </>
  )
}
