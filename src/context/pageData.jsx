import { createContext, useState } from "react";
import { 
  template, 
  copyright as dataCopyright,
  // page
  home as pageHome, 
  about as pageAbout, 
  paraOSeuNegocio as pageParaOSeuNegocio,
  distributors as pageDistributors,
  factory as pageFactory,
  autoparts as pageAutoparts,
  // components
  banners as dataBanners,
  partners as dataPartners,
  products as dataProducts,
  contact as dataContact,
  icons as dataIcons
} from '@/controller/data'


export const PageData = createContext(null)

export default function ContextPage({children}) {

  // Pages
  const [home] = useState(pageHome)
  const [about] = useState(pageAbout)
  const [paraOSeuNegocio] = useState(pageParaOSeuNegocio)
  const [factory] = useState(pageFactory)
  const [distributors] = useState(pageDistributors)
  const [autoparts] = useState(pageAutoparts)

  // Template Layouts
  const [layouts] = useState(template)
  const [copyright] = useState(dataCopyright)

  // Components
  const [banners] = useState(dataBanners)
  const [partners] = useState(dataPartners)
  const [products] = useState(dataProducts)
  const [contact] = useState(dataContact)
  const [icons] = useState(dataIcons)

  const exportData = {
    // Template
    layouts, 
    copyright,

    // Pages
    home, 
    about, 
    paraOSeuNegocio,
    factory,
    distributors,
    autoparts,
    
    // Components
    banners,
    partners,
    products,
    contact,
    icons,
  }

  return (
    <PageData.Provider value={exportData}>
        {children}
    </PageData.Provider>
  )
}
