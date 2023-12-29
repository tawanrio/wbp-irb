import { createContext, useState } from "react";
import { 
  template, 
  copyright as dataCopyright,
  // page
  _home as pageHome, 
  _about as pageAbout, 
  _paraOSeuNegocio as pageParaOSeuNegocio,
  _distributors as pageDistributors,
  _factory as pageFactory,
  _autoparts as pageAutoparts,
  _contact as pageContact,

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
  const [_home] = useState(pageHome)
  const [_about] = useState(pageAbout)
  const [_paraOSeuNegocio] = useState(pageParaOSeuNegocio)
  const [_factory] = useState(pageFactory)
  const [_distributors] = useState(pageDistributors)
  const [_autoparts] = useState(pageAutoparts)
  const [_contact] = useState(pageContact)

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
    _home, 
    _about, 
    _paraOSeuNegocio,
    _factory,
    _distributors,
    _autoparts,
    _contact,

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
