import Copyright from "./Copyright";
import Footer from "./Footer";
import Header from "./Header";
import ContactLine from "./ContactLine";

export default function Templates({style, children, template, page}) {
  style = style || 'default'
  const arrHeader =  template?.find(item => item?.label === "header")
  const header = arrHeader?.items.find(item => item?.label === style)


  const footer =  template?.find(item => item?.label === "footer")
  const copyright =  template?.find(item => item?.label === "copyright")
  const contactLine =  template?.find(item => item?.label === "contactline").items.find(menu => menu.label === "default")


  return (
    <>    
    <ContactLine content={contactLine} />
      <Header content={header} page={page} />
   
    <main>
      {children}
    </main>
    <Footer content={footer}/>
    <Copyright content={copyright}/>
    </>
  )
}