// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from "@/components/Banner/index";

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import Categories from '@/components/Categories';
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
import SearchPartnersOne from '@/components/SearchPartnersOne';

// Others
import { useEffect, useState} from 'react';
import  {useRouter}  from 'next/router';


export default function Distribuidoras({content}) {

  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(content?.page?.banners)
  const [title, setTitle] = useState(content?.page.title)
  const [metaTitle, setMetaTitle] = useState(content?.page.metaTitle)
  const [metaDescription, setMetaDescription] = useState(content?.page?.metaDescription)
  const [description] = useState(content?.page?.contentDescription)
  const [imgDescription] = useState(content?.page?.imgDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)
  const [faq] = useState(content?.page?.faq)
  
  console.log(content);

  useEffect(()=>{
    setTitle(content?.page.title)
    setMetaTitle(content?.page.metaTitle)
    setMetaDescription(content?.page.metaDescription)
  },[content?.page.title, content?.page.metaTitle])

  return (
    <>
    <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
       <meta name="keywords" content={metaKeywords || ''}/>
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
     </Head>
      <Templates template={content?.template} page={content?.page} menus={content?.menus}>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <Title title={title}/>
       <ContentDescription content={description}/>

       {/* <SearchPartners title="Encontre um distribuidor" collections={content?.collection} hiddenProductSearch  products={content?.products} /> */}

       <SearchPartnersOne geo={content?.geo} partnerType='distribuidor' arrRoute={content?.arrRoute} hiddenProductSearch title="Encontre um distribuidor" collections={content?.collection} products={content?.products}/>

       <ContentImgDescription content={imgDescription}/>
       {/* <ProductFaq products={content?.products} faq={faq} baseUrl={`/${pageUrl}/`}/>  */}
       <Categories categories={content?.categories} colors={content?.page?.colors.products} title baseUrlGeo={`/${pageUrl}/`}/>
       {/* <Products products={content?.products} colors={content?.page?.colors.products} baseUrl={`/${pageUrl}/`} title /> */}
       <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>

       </Templates>
   </>
  )
}
