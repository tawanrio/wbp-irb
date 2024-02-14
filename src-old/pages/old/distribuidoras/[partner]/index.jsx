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

export default function Contato({content, partner}) {

  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [logoContact] = useState(content?.page.logoContact)

console.log(partner);

  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template, 
    menuName: "header-home",
    itemTemplateName:"home",
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

  const whatsappNumber = partner.info.phone.find(number => number.label === 'Whatsapp')
  const phoneNumber = partner.info.phone.find(number => number.label === 'Telefone')
  const address = partner.info.address.find(address => address.label === 'default')

   
  return (
    <>
   <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
      <Templates template={content?.template} page={content?.page} menus={content?.menus}>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <IrbContact layout={partner}  logo={partner.logo} contentDescription={partner.contentDescription} title={partner.name} whatsapp={whatsappNumber} phone={phoneNumber}  />
       <ServiceAddress products={content?.products} address={address} />
       </Templates>
   </>
  )
}

async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"contact"}).lean();
  const menu = await Menu.findOne({label:"menu"}).lean();
  const template = await Template.find();
  const address = await Address.findOne({label:"info"})
  const collection = await Collection.find({label:"distributors"}).lean();
  const products = await ProductsDb.find().lean().limit(9);


  return {
    page:JSON.parse(JSON.stringify(page)),
    products:JSON.parse(JSON.stringify(products)),
    collection:JSON.parse(JSON.stringify(collection)),
    template:JSON.parse(JSON.stringify(template)),
    menu:JSON.parse(JSON.stringify(menu)),
    address:JSON.parse(JSON.stringify(address))
  }
  }
  finally{
    disconnectMongoDB();
  }
}

function getPartnerFromUrl(partners, pageUrl){
return partners.find(partner => formatStrToUrl(partner.name) === formatStrToUrl(pageUrl))
}

export const getServerSideProps  = async (context) => {
  try {
    const url = context.resolvedUrl.split('/').pop()
    const content = await getDataPage();
    const partner = getPartnerFromUrl(content.collection, url)

    return {
      props: {
        content,
        partner
      }
    };
  } catch (error) {
    console.error('Erro na página:', error);

    return {
      props: {
        content: null
      },
    };
  }
};