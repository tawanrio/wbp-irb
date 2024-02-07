import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Template
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BannerHome from '@/components/Banner/BannerHome'
import ContentDescription from '@/components/ContentDescription';
import InsertVideo from '@/components/InsertVideo';
import Partners from '@/components/Partners';
import Form from '@/components/Form';
import Products from '@/components/Products';

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Form as FormDb} from '@/service/model/schemas/formsSchema'


// Other || functions
import { useState } from 'react';
import { insertMenuInTemplate } from '@/utils/functions'

export default function Home({content}) {

    const [banners] = useState(content?.page?.banners)
    const [metaTitle] = useState(content?.page?.metaTitle)
    const [metaDescription] = useState(content?.page?.metaDescription)
    const [title] = useState(content?.page?.title)
    const [video] = useState(content?.page?.video)
    const [description] = useState(content?.page?.contentDescription)
    const [formDefault] = useState(content?.form?.forms.find(item => item.label === "default"))
  

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
    
   
    
  return (
    <>
       <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
        <Templates style="home" template={content?.template} page={content?.page}>
          <BannerHome banners={banners} />
          <InsertVideo content={video}/>
          <ContentDescription content={description}/>
          <Partners title={content?.partners?.title} partners={content?.partners?.types}  colors={content?.partners?.colors}/>
          <Products products={content?.products} colors={content?.page?.colors.products} title={'Produtos'} />
          <Form inputs={formDefault} colors={content?.form?.colors}/>
        </Templates>
    </>
  )
}
async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"home"}).lean();
  const menu = await Menu.findOne({label:"menu"}).lean();
  const template = await Template.find();
  const partners = await Categories.findOne({label:"partners"}).lean();
  const products = await ProductsDb.find().lean().limit(6);
  const form = await FormDb.findOne({label: "form"}).lean();


  return {
    page:JSON.parse(JSON.stringify(page)),
    partners:JSON.parse(JSON.stringify(partners)),
    products:JSON.parse(JSON.stringify(products)),
    form:JSON.parse(JSON.stringify(form)),
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
    content?.partners.types.unshift({
      title: 'Fábrica',
      bgImage: '/images/carousel/banner1.svg',
      label: 'fabrica'
    })
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