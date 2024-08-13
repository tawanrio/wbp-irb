/* eslint-disable array-callback-return */
export function insertMenuInTemplate({
  menus,
  menuName,
  template,
  templateName,
  itemTemplateName,
}) {
  const menu = menus?.find((menu) => menu.label === menuName)

  // console.log(menus);
  // console.log(menuName);

  template
    ?.find((template) => template.label === templateName)
    .items.find((item) => {
      if (item.label === itemTemplateName) {
        if (!Array.isArray(item.nav)) {
          item.nav = []
        }
        // verificar se já existe menu no array item.nav
        if (item.nav.find((item) => item.label === menu.label)) {
          return item
        }
        item.nav.push(menu)

        return item
      }
    })
}

export function getProductFromUrl(products, pageUrl) {
  const produto = products.find(
    (product) => product.label === formatStrToUrl(pageUrl),
  )

  return produto
}

export const formatStrToUrl = (string) => {
  let formatedString = string && formatStrToNoAccent(string)
  formatedString =
    formatedString &&
    formatedString.toLowerCase().trim().replace('/', '').replaceAll(' ', '-')
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
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
export const formatStrToNoSpecialChars = (str) => {
  return str.replace(/[^\w\s]/gi, '')
}

export const createModifiedFile = (file) => {
  // Obter o nome original do arquivo e seu tipo

  const originalName = file.name
  const fileType = file.type ? file.type : 'image/heic'

  // Formatando e truncando o nome do arquivo
  const modifiedName = truncateFileName(originalName)

  // Criar um novo arquivo com o nome modificado
  return new File([file], modifiedName, { type: fileType })
}

export const truncateFileName = (filename, maxLength = 25) => {
  if (filename.length <= maxLength) return filename

  const ext = filename.slice(filename.lastIndexOf('.'))
  const nameWithoutExt = filename.slice(0, filename.lastIndexOf('.'))
  const truncatedName = nameWithoutExt.slice(0, maxLength - ext.length)

  return truncatedName + ext
}

export const formatPhoneNumber = (str) => {
  let cleaned = str.replace(/[^0-9]/g, '')
  if (cleaned.startsWith('55')) {
    cleaned = cleaned.slice(2)
  }
  if (cleaned.length === 11) {
    const formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    return formatted
  }
  return str
}

export function formatToViewPhone(numero) {
  // Remove todos os caracteres que não são dígitos
  numero = numero.replace(/\D/g, '')

  // Verifica o tamanho do número e aplica a formatação apropriada
  if (numero.length === 10) {
    // Formato (xx) xxxx-xxxx
    return `(${numero.slice(0, 2)}) ${numero.slice(2, 6)}-${numero.slice(6)}`
  } else if (numero.length === 11) {
    // Formato (xx) x-xxxx-xxxx
    return `(${numero.slice(0, 2)}) ${numero.slice(2, 3)}-${numero.slice(3, 7)}-${numero.slice(7)}`
  } else {
    // Retorna o número original se ele não tiver 10 ou 11 dígitos
    return numero
  }
}
export const replaceShortcodePartner = (text, partner) => {
  const shortcode = '{{partner}}'
  const replace = `${partner}`
  let newArray = text // Definir newArray como o texto original por padrão
  if (Array.isArray(text)) {
    newArray = text.map((item) => {
      const hasShortcode = item.includes(shortcode)
      if (hasShortcode) {
        return item.replace(new RegExp(shortcode, 'g'), replace)
      } else {
        return item // Retorna o item original se não houver shortcode
      }
    })
  } else if (typeof text === 'string') {
    const hasShortcode = text.includes(shortcode)
    if (hasShortcode) {
      newArray = text.replace(new RegExp(shortcode, 'g'), replace)
    }
  }
  return newArray
}

export function updateMetatitleGeo(metatitle, geoName) {
  return metatitle.replace('-', `em ${geoName} - `)
}

function getSecondOccurrenceIndex(str, char) {
  const firstIndex = str.indexOf(char)
  if (firstIndex !== -1) {
    const secondIndex = str.indexOf(char, firstIndex + 1)
    return secondIndex !== -1 ? secondIndex : -1
  }
  return -1
}

export function updateMetatitleGeoRouteThree(metatitle, geoName) {
  const secondIndex = getSecondOccurrenceIndex(metatitle, '-')
  if (secondIndex !== -1) {
    const before = metatitle.substring(0, secondIndex).trim()
    const after = metatitle.substring(secondIndex + 1).trim()
    return `${before} ${geoName} ${after}`
  }
  return metatitle
}

export const generateActionsLink = (cnpj, uniqueId) => {
  const cleanedCnpj = cnpj.replace(/\D/g, '')
  console.log(uniqueId)
  const domain = window.location.origin

  const accept = `${domain}/registerpartner/actions/${cleanedCnpj}/accept/${uniqueId} `

  const refuse = `${domain}/registerpartner/actions/${cleanedCnpj}/refuse/${uniqueId} `
  return { accept, refuse }
}

export function generateUniqueIdByCnpj(cnpj) {
  // const firstFour = cnpj.replace(/\D/g, "").substring(0, 4).toString();

  // const fourRandomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(4, '0');
  // const twoRandomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(2, '0');

  // const uniqueId = fourRandomNumbers + firstFour + twoRandomNumbers;

  // return uniqueId;

  // Remover todos os caracteres não numéricos do CNPJ
  const cleanedCnpj = cnpj.replace(/\D/g, '')

  // Garantir que o CNPJ tenha pelo menos 12 dígitos
  const paddedCnpj = cleanedCnpj.padEnd(12, '0')

  // Obter a hora atual no formato HHMMSS
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const seconds = now.getSeconds().toString().padStart(2, '0')

  // Construir o ID único no formato "HHxxxxxxMMxxxxx"
  const uniqueId = `${hours}${paddedCnpj.substring(0, 6)}${minutes}${paddedCnpj.substring(6, 12)}`

  return uniqueId
}
export function getCurrentDateFormatted() {
  const currentDate = new Date()

  // Extract year, month, day, hour, and minutes from the current date
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Add leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, '0') // Add leading zero if necessary
  const hour = String(currentDate.getHours()).padStart(2, '0') // Add leading zero if necessary
  const minutes = String(currentDate.getMinutes()).padStart(2, '0') // Add leading zero if necessary

  // Format the date in 'yyyy/mm/dd-hh-mm' format
  const formattedDate = `${year}/${month}/${day}-${hour}:${minutes}`

  return formattedDate
}

export function sortByKey(array, key) {
  return array.sort((a, b) => {
    if (a.title === true && b.title !== true) {
      return -1
    }
    if (a.title !== true && b.title === true) {
      return 1
    }
    if (a.priority !== undefined && b.priority !== undefined) {
      if (a.priority !== b.priority) {
        return a.priority - b.priority
      }
    } else if (a.priority !== undefined) {
      return a.priority === -1 ? 1 : -1
    } else if (b.priority !== undefined) {
      return b.priority === -1 ? -1 : 1
    }

    const aValue = a[key]?.toString().toLowerCase()
    const bValue = b[key]?.toString().toLowerCase()

    if (aValue < bValue) {
      return -1
    }
    if (aValue > bValue) {
      return 1
    }
    return 0
  })
}

export const generateProductUrl = (baseUrl, name) => {
  return `/${baseUrl[1]}/${name}`
}

export const fetchAddress = async (cleanedValue) => {
  try {
    const url = `https://api.brasilaberto.com/v1/zipcode/${cleanedValue}`
    const returnAddress = await fetch(url).then((response) => {
      return response.json()
    })

    return returnAddress
  } catch (error) {
    return null
  }
}

export const sanitizeHtml = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, '')
}

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
