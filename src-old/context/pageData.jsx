import { createContext, useState } from "react";
import { 
  template as layouts, 
  copyright ,
  base,
  // page
  _home, 
  _about, 
  _paraOSeuNegocio,
  _distributors,
  _factory,
  _autoparts,
  _contact,
  _autocenters,
  _partners,
  _products,

  // components
  banners ,
  partners ,
  products ,
  form ,
  icons 
} from '@/controller/data'


export const PageData = createContext(null)

export default function ContextPage({children}) {


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
    _partners,
    _products,

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
