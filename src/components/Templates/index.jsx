import Copyright from "./Copyright";
import Footer from "./Footer";
import Header from "./Header";
import ContactLine from "./ContactLine";
import { ToastContainer } from "react-toastify";

import { insertMenuInTemplate } from '@/utils/functions'
import CookiePopup from "../CookiePopup";

export default function Templates({style, children, template, page, menus}) {
  style = style || 'default'
  const arrHeader =  template?.find(item => item?.label === "header")
  const header = arrHeader?.items.find(item => item?.label === style)


  const footer =  template?.find(item => item?.label === "footer")
  const copyright =  template?.find(item => item?.label === "copyright")
  const contactLine =  template?.find(item => item?.label === "contactline").items.find(menu => menu.label === "default")

  insertMenuInTemplate({
    menus:  menus,
    template:  template,  
    menuName: "header",
    itemTemplateName:"default",
    templateName: "header"
  })
  insertMenuInTemplate({
    menus: menus,
    menuName: "contactline",
    template:  template,  
    itemTemplateName:"default",
    templateName: "contactline"
  })

  insertMenuInTemplate({
    menus: menus,
    menuName: "partners",
    template:  template,  
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menus: menus,
    template:  template,  
    menuName: "products",
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menus: menus,
    template:  template,  
    menuName: "company",
    itemTemplateName:"default",
    templateName: "footer"
  })
   

  return (
    <>    
    <ContactLine content={contactLine} />
      <Header content={header} page={page} />
      <CookiePopup />
      <ToastContainer/>
    <main>
      {children}
    </main>
    <Footer content={footer}/>
    <Copyright content={copyright}/>
    </>
  )
}