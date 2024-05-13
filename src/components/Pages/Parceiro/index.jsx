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
import {Collection} from '@/service/model/schemas/collectionsSchema'

// Context Api
import { useState } from 'react';
import ServiceAddress from '@/components/ServiceAddress';
import { insertMenuInTemplate, formatStrToUrl } from '@/utils/functions'

export default function Contato({content}) {

    const [partner] = useState(content?.collection)

  const [metaTitle] = useState(partner?.metaTitle)
  const [metaDescription] = useState(partner?.metaDescription)
  const [banners] = useState(partner?.banners)
  const [title] = useState(partner?.title)
//   const [description] = useState(content?.page.contentDescription)
//   const [logoContact] = useState(content?.page.logoContact)


console.log(content);

   

  let whatsappNumber = partner.info.phone.find(number => number.label === 'Whatsapp') || null
  let phoneNumber = partner.info.phone.find(number => number.label === 'Telefone') || null
  const address = partner.info.address.find(address => address.label === 'default')

  if(phoneNumber){
    if(!whatsappNumber){
      whatsappNumber = phoneNumber
    }
  }
  if(whatsappNumber){ 
    if(!phoneNumber){
      phoneNumber = whatsappNumber
    }
  }
  if(!whatsappNumber) whatsappNumber = '11994412805'
  if(!phoneNumber) phoneNumber = '11994412805'

   const categoryAndProduct = [...content.categories, ...content.products]
  return (
    <>
   <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
     </Head>
      <Templates template={content?.template} page={content?.page} menus={content?.menus}>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <IrbContact layout={partner}  logo={partner.logo} contentDescription={partner.contentDescription} title={partner.tradingName} whatsapp={whatsappNumber} phone={phoneNumber}  />
       <ServiceAddress products={content.categories} address={address} />
       </Templates>
   </>
  )
}
