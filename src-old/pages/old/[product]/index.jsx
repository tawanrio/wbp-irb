// Template
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import ContentDescription from '@/components/ContentDescription';
import Title from '@/components/Title';
import Banner from "@/components/Banner";
import BreadCrumb from '@/components/BreadCrumb';
import ProductModels from '@/components/Products/ProductModels';
import Faq from '@/components/Faq';
import Filter from '@/components/Filter';

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'


// Others
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {getProductFromUrl,insertMenuInTemplate} from '@/utils/functions'

export default function Products({ content,produto }) {

  const route = useRouter()
  const pageUrl = route.asPath.replace('/','')

  


const [product, setProduct] = useState(produto)

  const [banners] = useState(content?.page?.banners)
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [title] = useState(content?.page?.title)
  const [description] = useState(content?.page?.contentDescription)


  useEffect(()=>{
    setProduct(getProductFromUrl(content.products, pageUrl))
    

  },[pageUrl, product])

  insertMenuInTemplate({
menu:content?.menu,
    template: content?.template, 
menu:content?.menu,
    template: content?.template,  
    menuName: "header-home",
    itemTemplateName:"home",
    templateName: "header"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template, 
    menu:content?.menu,
    template: content?.template,  
    menuName: "partners",
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template, 
    menu:content?.menu,
    template: content?.template,  
    menuName: "products",
    itemTemplateName:"default",
    templateName: "footer"
  })
  insertMenuInTemplate({
    menu:content?.menu,
    template: content?.template, 
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
          <Banner banners={banners} />
          <BreadCrumb/>
          <Title title={product?.title}/>
          <ContentDescription content={product?.contentDescription}/>
          {/* <ProductModels products={product?.models} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}
          <Filter select={product?.models}  title={'Título h2 - Modelos Produtos'}/>
          <Faq faq={product?.faq}/>
        </Templates>
    
   </>
  )
}


async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"products"}).lean();
  const menu = await Menu.findOne({label:"menu"}).lean();
  const template = await Template.find();
  const products = await ProductsDb.find().lean().limit(6);


  return {
    page:JSON.parse(JSON.stringify(page)),
    products:JSON.parse(JSON.stringify(products)),
    template:JSON.parse(JSON.stringify(template)),
    menu:JSON.parse(JSON.stringify(menu))
  }
  }
  finally{
    disconnectMongoDB();
  }
}


export const getServerSideProps  = async (context) => {
    const url = context.resolvedUrl
    const content = await getDataPage();

    const produto = getProductFromUrl(content.products, url)

    return {
      props: {
        content,
        produto
      }
    };
 
}
