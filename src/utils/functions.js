export function insertMenuInTemplateOld({menu,menuName,template,templateName,itemTemplateName}){
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
  //   insertMenuInTemplate({
  //   menu:content?.menu,
  //   template: content?.template,  
  //   menuName: "header",
  //   itemTemplateName:"default",
  //   templateName: "header"
  // })

  export function insertMenuInTemplate({menus,menuName,template,templateName,itemTemplateName}){
    let menu = menus?.find(menu => menu.label === menuName)

    // console.log(menus);
    // console.log(menuName);

    template?.find(template => template.label === templateName).items.find(item => {
      if(item.label === itemTemplateName){
        if (!Array.isArray(item.nav)) {
          item.nav = [];
        }
        // verificar se já existe menu no array item.nav
        if (item.nav.find(item => item.label === menu.label)) {
          return item
        }
        item.nav.push(menu);

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
  export const replaceShortcodePartner = (text, partner) => {
    const shortcode = '{{partner}}';
    const replace = `${partner}`;
    let newArray = text; // Definir newArray como o texto original por padrão
    if (Array.isArray(text)) {
        newArray = text.map(item => {
            const hasShortcode = item.includes(shortcode);
            if (hasShortcode) {
                return item.replace(new RegExp(shortcode, 'g'), replace);
            } else {
                return item; // Retorna o item original se não houver shortcode
            }
        });
    } else if (typeof text === 'string') {
        const hasShortcode = text.includes(shortcode);
        if (hasShortcode) {
            newArray = text.replace(new RegExp(shortcode, 'g'), replace);
        }
    }
    return newArray;
};

export function updateMetatitleGeo(metatitle, geoName) {
  return metatitle.replace('-',`em ${geoName} - `);
}

function getSecondOccurrenceIndex(str, char) {
  let firstIndex = str.indexOf(char);
  if (firstIndex !== -1) {
    let secondIndex = str.indexOf(char, firstIndex + 1);
    return secondIndex !== -1 ? secondIndex : -1;
  }
  return -1;
}

export function updateMetatitleGeoRouteThree(metatitle, geoName) {
  const secondIndex = getSecondOccurrenceIndex(metatitle, '-');
  if (secondIndex !== -1) {
    const before = metatitle.substring(0, secondIndex).trim();
    const after = metatitle.substring(secondIndex + 1).trim();
    return `${before} ${geoName} ${after}`;
  }
  return metatitle;
}