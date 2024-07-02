// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb';
import Banner from "@/components/Banner/index";
import Title from '@/components/Title';
import PartnersType from '@/components/PartnersType';
import ProductFaq from '@/components/ProductFaq';

// Others
import { useState} from 'react';

import  {useRouter}  from 'next/router';

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'

// Util
import { insertMenuInTemplate } from '@/utils/functions'

export default function Parceiros({content}) {

  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [faq] = useState(content?.page.faq)

   
  


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
       <PartnersType partners={content?.partners} baseUrl={`/${pageUrl}/`}/>
       <ProductFaq products={content?.products} faq={faq} baseUrl={`/${pageUrl}/`}/>
       
       </Templates>
   </>
  )
}


async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"partners"}).lean();
  const menu = await Menu.findOne({label:"menu"}).lean();
  const template = await Template.find();
  const partners = await Categories.findOne({label:"partners"}).lean();
  const products = await ProductsDb.find().lean().limit(6);


  return {
    page:JSON.parse(JSON.stringify(page)),
    partners:JSON.parse(JSON.stringify(partners)),
    products:JSON.parse(JSON.stringify(products)),
    template:JSON.parse(JSON.stringify(template)),
    menu:JSON.parse(JSON.stringify(menu))
  }
  }
  finally{
    disconnectMongoDB();
  }
}

export const getServerSideProps  = async () => {
  try {
    const content = await getDataPage();
  
    return {
      props: {
        content
      }
    };
  } catch (error) {
    console.error('Erro na página:', error);

    return {
      props: {
        content
      },
    };
  }
};