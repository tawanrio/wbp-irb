// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title';

// Components
import Banner from "@/components/Banner";
import ContentDescription from '@/components/ContentDescription';
import InsertVideo from '@/components/InsertVideo';
import Partners from '@/components/Partners';
import Form from '@/components/Form';
import CompanyValues from '@/components/CompanyValues';
import Products from '@/components/Products';
import BreadCrumb from '@/components/BreadCrumb';
import TextVideo from '@/components/TextVideo';

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Form as FormDb} from '@/service/model/schemas/formsSchema'

// Others || functions
import { useState } from 'react';
import { insertMenuInTemplate } from '@/utils/functions'

export default function QuemSomos({page, partners, products, form, menu, template}) {

    const [metaTitle] = useState(page?.metaTitle)
    const [metaDescription] = useState(page?.metaDescription)
    const [banners] = useState(page?.banners)
    const [title] = useState(page?.title)
    const [video] = useState(page?.video)
    const [cardsValues] = useState(page?.companyValues)
    const [description] = useState(page?.contentDescription)
    const [formDefault] = useState(form?.forms.find(item => item.label === "default"))



    insertMenuInTemplate({
      menu,
      template, 
      menuName: "header",
      itemTemplateName:"default",
      templateName: "header"
    })
    
    insertMenuInTemplate({
      menu,
      template, 
      menuName: "partners",
      itemTemplateName:"default",
      templateName: "footer"
    })
    insertMenuInTemplate({
      menu,
      template, 
      menuName: "products",
      itemTemplateName:"default",
      templateName: "footer"
    })
    insertMenuInTemplate({
      menu,
      template, 
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
     
    <Templates template={template} page={page}>
        <Banner banners={banners} video={video}/>
        {/* <BreadCrumb/> */}
        {/* <Title title={title}/> */}
        <CompanyValues cards={cardsValues}/>
        <TextVideo video={video} description={description} />
        {/* <InsertVideo content={video}/> */}
        {/* <ContentDescription content={description}/> */}
        <Products products={products} colors={page?.colors.products} title />
        <Partners title={"Nossos parceiros"} partners={partners?.types}  colors={partners?.colors}/>

        <Form inputs={formDefault} colors={form?.colors}/>
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
    const {page, partners, products, form, menu,template} = await getDataPage();
   
    return {
      props: {
        page,
        partners,
        products,
        form,
        template,
        menu
      }
    };
  } catch (error) {
    console.error('Erro na página:', error);

    return {
      props: {
        page: null,
        partners: null,
        products: null,
        menu: null,
        template: null,
        form: null
      },
    };
  }
};