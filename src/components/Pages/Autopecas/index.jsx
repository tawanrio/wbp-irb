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
import {Collection} from '@/service/model/schemas/collectionsSchema'


// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import ContentImgDescription from '@/components/ContentImgDescription';
import ProductFaq from '@/components/ProductFaq';
import Title from '@/components/Title';
import Products from '@/components/Products';
import Partners from '@/components/Partners';

// Others
import { useState} from 'react';
import  {useRouter}  from 'next/router';
import SearchPartners from '@/components/SearchPartners';
import { insertMenuInTemplate } from '@/utils/functions'

export default function Autoparts({content}) {


  console.log(content);
  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [description] = useState(content?.page.contentDescription)
  const [imgDescription] = useState(content?.page.imgDescription)
  const [faq] = useState(content?.page.faq)

    
   
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
       <ContentDescription content={description}/>
       <SearchPartners geo={content?.geo} partnerType='autopeça' hiddenProductSearch title="Encontre uma autopeça" collections={content?.collection} products={content?.products}/>
       <ContentImgDescription content={imgDescription}/>
       <Categories baseUrl={`${pageUrl}/`} categories={content?.categories} colors={content?.page?.colors.products} title />
       {/* <Products products={content?.products} colors={content?.page?.colors.products} baseUrl={`${pageUrl}/`} title /> */}
       <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>

       {/* <ProductFaq products={content?.products} faq={faq} baseUrl={`/${pageUrl}/`}/>  */}
       
       </Templates>
   </>
  )
}
