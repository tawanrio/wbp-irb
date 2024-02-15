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


export default function Distribuidoras({content}) {

  console.log(content);

  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(content?.page?.banners)
  const [title] = useState(content?.page?.title)
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [description] = useState(content?.page?.contentDescription)
  const [imgDescription] = useState(content?.page?.imgDescription)
  const [faq] = useState(content?.page?.faq)

  
   
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
       <SearchPartners partnerType='distribuidor' title="Encontre um distribuidor" collections={content?.collection} hiddenProductSearch  products={content?.products} geo={content?.geo}/>
       <ContentImgDescription content={imgDescription}/>
       {/* <ProductFaq products={content?.products} faq={faq} baseUrl={`/${pageUrl}/`}/>  */}
       <Categories baseUrl={`${pageUrl}/`} categories={content?.categories} colors={content?.page?.colors.products} title />
       {/* <Products products={content?.products} colors={content?.page?.colors.products} baseUrl={`${pageUrl}/`} title /> */}
       <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>

       </Templates>
   </>
  )
}
