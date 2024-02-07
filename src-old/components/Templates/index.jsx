import Copyright from "./Copyright";
import Footer from "./Footer";
import Header from "./Header";

export default function Templates({style, children, template, page}) {
  style = style || 'default'
  const arrHeader =  template?.find(item => item?.label === "header")
  const header = arrHeader?.items.find(item => item?.label === style)


  const footer =  template?.find(item => item?.label === "footer")
  const copyright =  template?.find(item => item?.label === "copyright")

  return (
    <>    
      <Header content={header} page={page} />
   
    <main>
      {children}
    </main>
    <Footer content={footer}/>
    <Copyright content={copyright}/>
    </>
  )
}