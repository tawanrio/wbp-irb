// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from "@/components/Banner";

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import Categories from '@/components/Categories';
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'

// Others
import { useState} from 'react';
import  {useRouter}  from 'next/router';
import { insertMenuInTemplate } from '@/utils/functions'

// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import CompanyValues from '@/components/CompanyValues';
import ContentImgDescription from '@/components/ContentImgDescription';
import Products from '@/components/Products';
import Faq from '@/components/Faq';
import Title from '@/components/Title';
import InsertVideo from '@/components/InsertVideo';



export default function Fabrica({content}) {

  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [video] = useState(content?.page?.video)
  const [cardsValues] = useState(content?.page?.companyValues)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [imgDescription] = useState(content?.page.imgDescription)
  const [faq] = useState(content?.page.faq)

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
   <Templates template={content?.template} page={content?.page} >
      <Banner banners={banners}/>
       <BreadCrumb/>
       <Title title={title}/>
       <CompanyValues cards={cardsValues}/>
       <ContentImgDescription content={imgDescription}/>
       <ContentDescription content={description}/>
        <InsertVideo content={video}/>
        <Categories baseUrlGeo={`${pageUrl}/`} categories={content?.categories} colors={content?.page?.colors.products} title />
       {/* <Products baseUrlGeo={`${pageUrl}/`} products={content?.products} colors={content?.page?.colors.products} title/> */}
    </Templates>
          
   </>
  )
}
