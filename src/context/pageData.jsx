import { createContext, useState } from "react";
import { 
  template, 
  copyright as dataCopyright,
  base,
  // page
  _home as pageHome, 
  _about as pageAbout, 
  _paraOSeuNegocio as pageParaOSeuNegocio,
  _distributors as pageDistributors,
  _factory as pageFactory,
  _autoparts as pageAutoparts,
  _contact as pageContact,
  _autocenters as pageAutocenters,

  // components
  banners as dataBanners,
  partners as dataPartners,
  products as dataProducts,
  form as dataForm,
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
  const [_autocenters] = useState(pageAutocenters)

  // Template Layouts
  const [layouts] = useState(template)
  const [copyright] = useState(dataCopyright)

  // Components
  const [banners] = useState(dataBanners)
  const [partners] = useState(dataPartners)
  const [products] = useState(dataProducts)
  const [form] = useState(dataForm)
  const [icons] = useState(dataIcons)

  const exportData = {
    // Template
    layouts, 
    copyright,
    base,

    // Pages
    _home, 
    _about, 
    _paraOSeuNegocio,
    _factory,
    _distributors,
    _autoparts,
    _contact,
    _autocenters,

    // Components
    banners,
    partners,
    products,
    form,
    icons,
  }

  return (
    <PageData.Provider value={exportData}>
        {children}
    </PageData.Provider>
  )
}
