export function insertMenuInTemplate({menu,menuName,template,templateName,itemTemplateName}){
    let menuHeader = menu?.menus.find(item => item.label === menuName)

    template?.find(template => template.label === templateName).items.find(item => {
      if(item.label === itemTemplateName){
        if (!Array.isArray(item.nav)) {
          item.nav = [];
        }
        // verificar se já existe menuHeader no array item.nav
        if (item.nav.find(item => item.label === menuHeader.label)) {
          return item
        }
        item.nav.push(menuHeader);

        return item
      }
    })
  }

  export function getProductFromUrl(products, pageUrl) {

    const produto = products.find(product => product.label === formatStrToUrl(pageUrl))
  
   return produto
  }
  
  export const formatStrToUrl = (string) =>{
    let formatedString = string && formatStrToNoAccent(string)
     formatedString = formatedString && formatedString.toLowerCase().trim().replace('/', '').replaceAll(' ','-')
  return formatedString
  }

  export const formatStrToNoDash = (str) => {
    let formatedString = formatStrToNoAccent(str)
    formatedString = formatedString.trim().replaceAll('-', ' ').toLowerCase()
    return formatedString
  }
  export const formatStrToNoAccent = (str) => {
    return  str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }
 
  export const formatPhoneNumber = (str) => {
    return str.replace(/[^0-9]/g, '')
  }