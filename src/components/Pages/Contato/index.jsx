// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb';
import IrbContact from '@/components/IrbContact'
import Banner from "@/components/Banner";

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Address} from '@/service/model/schemas/addressSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'

// Context Api
import { useState } from 'react';
import ServiceAddress from '@/components/ServiceAddress';
import { insertMenuInTemplate } from '@/utils/functions'

export default function Contato({content}) {

  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [logoContact] = useState(content?.page.logoContact)

  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template, 
    menuName: "header",
    itemTemplateName:"default",
    templateName: "header"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template,  
    menuName: "partners",
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template,  
    menuName: "products",
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template,  
    menuName: "company",
    itemTemplateName:"default",
    templateName: "footer"
  })
  
  const whatsappNumber = logoContact.button.whatsapp
  const phoneNumber = logoContact.button.phone
  const address = content?.address.address.find(address => address.label === 'default')


   
  return (
    <>
   <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
     <Templates template={content?.template} page={content?.page}>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <IrbContact  logo={logoContact?.logo} contentDescription={logoContact?.contentDescription} title={logoContact?.title} whatsapp={whatsappNumber} phone={phoneNumber}  />
       <ServiceAddress products={content?.products} address={content?.address} />
       </Templates>
   </>
  )
}
