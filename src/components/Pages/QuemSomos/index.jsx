// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title';

// Components
import Banner from "@/components/Banner/index";
import ContentDescription from '@/components/ContentDescription';
import InsertVideo from '@/components/InsertVideo';
import Partners from '@/components/Partners';
import Form from '@/components/Form';
import CompanyValues from '@/components/CompanyValues';
import Products from '@/components/Products';
import BreadCrumb from '@/components/BreadCrumb';

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

export default function QuemSomos({content}) {

    const [metaTitle] = useState(content?.page?.metaTitle)
    const [metaDescription] = useState(content?.page?.metaDescription)
    const [banners] = useState(content?.page?.banners)
    const [title] = useState(content?.page?.title)
    const [video] = useState(content?.page?.video)
    const [cardsValues] = useState(content?.page?.companyValues)
    const [description] = useState(content?.page?.contentDescription)
    // const [formDefault] = useState(form?.forms.find(item => item.label === "default"))


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
    

  return (
    <>
     <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
     
     <Templates template={content?.template} page={content?.page} menus={content?.menus}>
        <Banner banners={banners}/>
        <BreadCrumb/>
        <Title title={title}/>
        <CompanyValues cards={cardsValues}/>
        <InsertVideo content={video}/>
       
        <ContentDescription content={description}/>
        <Partners title={content?.partners?.title} partners={content?.partners?.types}  colors={content?.partners?.colors}/>
        <Products products={content?.products} colors={content?.page?.colors.products} title={'Produtos'} />

        {/* <Form inputs={formDefault} colors={form?.colors}/> */}
      </Templates>
 
    </>
  )
}
