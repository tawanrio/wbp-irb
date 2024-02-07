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
import {Categories} from '@/service/model/schemas/categoriesSchema'
import {Collection} from '@/service/model/schemas/collectionsSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'


// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import ContentImgDescription from '@/components/ContentImgDescription';
import ProductFaq from '@/components/ProductFaq';
import Products from '@/components/Products';
import Title from '@/components/Title';
import Partners from '@/components/Partners';
import SearchPartners from '@/components/SearchPartners';

// Others
import { useState} from 'react';
import  {useRouter}  from 'next/router';
import { insertMenuInTemplate } from '@/utils/functions'

export default function Distribuidoras({content}) {

  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(content?.page?.banners)
  const [title] = useState(content?.page?.title)
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [description] = useState(content?.page?.contentDescription)
  const [imgDescription] = useState(content?.page?.imgDescription)
  const [faq] = useState(content?.page?.faq)

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
     <Templates template={content?.template} page={content?.page}>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <Title title={title}/>
       <ContentDescription content={description}/>
       <SearchPartners title="Encontre um distribuidor" collections={content?.collection} hiddenProductSearch  products={content?.products} />
       <ContentImgDescription content={imgDescription}/>
       {/* <ProductFaq products={content?.products} faq={faq} baseUrl={`/${pageUrl}/`}/>  */}
       <Products products={content?.products} colors={content?.page?.colors.products} baseUrl={`${pageUrl}/`} title />
       <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>

       </Templates>
   </>
  )
}
