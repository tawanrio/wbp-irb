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
  export const formatStrToDash = (str) => {
    let formatedString = formatStrToNoAccent(str)
    formatedString = formatStrToNoSpecialChars(formatedString)
    formatedString = formatedString.trim().replaceAll(' ', '-').toLowerCase()
    return formatedString
  }
  export const formatStrToNoAccent = (str) => {
    return  str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }
  export const formatStrToNoSpecialChars = (str) => {
    return str.replace(/[^\w\s]/gi, '');
  }
 
  export const formatPhoneNumber = (str) => {
    let cleaned = str.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('55')) {
      cleaned = cleaned.slice(2);
    }
    if (cleaned.length === 11) {
      const formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
      return formatted;
    }
    return str;
  };
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

export const generateActionsLink = (cnpj,uniqueId) => {
  const cleanedCnpj = cnpj.replace(/\D/g, "");
console.log(uniqueId);
  const domain = window.location.origin;
  
  const accept =  `${domain}/registerpartner/actions/${cleanedCnpj}/accept/${uniqueId} `

  const refuse =  `${domain}/registerpartner/actions/${cleanedCnpj}/refuse/${uniqueId} `
  return {accept, refuse}
}


export function generateUniqueIdByCnpj(cnpj) {
  
  // const firstFour = cnpj.replace(/\D/g, "").substring(0, 4).toString();

  // const fourRandomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(4, '0');
  // const twoRandomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(2, '0');

  // const uniqueId = fourRandomNumbers + firstFour + twoRandomNumbers;
  
  // return uniqueId;

   // Remover todos os caracteres não numéricos do CNPJ
   const cleanedCnpj = cnpj.replace(/\D/g, "");

   // Garantir que o CNPJ tenha pelo menos 12 dígitos
   const paddedCnpj = cleanedCnpj.padEnd(12, '0');
 
   // Obter a hora atual no formato HHMMSS
   const now = new Date();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');
 
   // Construir o ID único no formato "HHxxxxxxMMxxxxxSS"
   const uniqueId = `${hours}${paddedCnpj.substring(0, 6)}${minutes}${paddedCnpj.substring(6, 12)}`;
 
   return uniqueId;
}
export function getCurrentDateFormatted() {
  const currentDate = new Date();
  
  // Extract year, month, day, hour, and minutes from the current date
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const hour = String(currentDate.getHours()).padStart(2, '0'); // Add leading zero if necessary
  const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Add leading zero if necessary
  
  // Format the date in 'yyyy/mm/dd-hh-mm' format
  const formattedDate = `${year}/${month}/${day}-${hour}:${minutes}`;
  
  return formattedDate;
}

export function sortByKey(array) {
  return array.sort((a, b) => {
    // Itens com prioridade vêm primeiro
    if (a.priority !== undefined && b.priority !== undefined) {
      // Se ambos têm prioridade, ordene por prioridade
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
    } else if (a.priority !== undefined) {
      // Se só 'a' tem prioridade, 'a' vem primeiro
      return a.priority === -1 ? 1 : -1;
    } else if (b.priority !== undefined) {
      // Se só 'b' tem prioridade, 'b' vem primeiro
      return b.priority === -1 ? -1 : 1;
    }

    // Itens sem prioridade são ordenados alfabeticamente
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
}