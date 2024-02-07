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
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'

// Others
import { useState} from 'react';
import  {useRouter}  from 'next/router';
import { insertMenuInTemplate } from '@/utils/functions'

// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import ContentImgDescription from '@/components/ContentImgDescription';
import Products from '@/components/Products';
import Faq from '@/components/Faq';
import Title from '@/components/Title';



export default function Fabrica({page, partners, products, form, menu, template}) {
  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(page?.banners)
  const [title] = useState(page?.title)
  const [description] = useState(page?.contentDescription)
  const [metaTitle] = useState(page?.metaTitle)
  const [metaDescription] = useState(page?.metaDescription)
  const [imgDescription] = useState(page?.imgDescription)
  const [faq] = useState(page?.faq)

  insertMenuInTemplate({
    menu,
    template, 
    menuName: "header-home",
    itemTemplateName:"home",
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
      <Banner banners={banners}/>
       <BreadCrumb/>
       <Title title={title}/>
       <ContentDescription content={description}/>
       <Products baseUrl={`/${pageUrl}/`} products={products} colors={page?.colors.products} title={'Produtos'} />
       <ContentImgDescription content={imgDescription}/>
        {/* <Faq faq={faq}/> */}
    </Templates>
          
   </>
  )
}

async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"factory"}).lean();
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
    const {page, partners, products, menu,template} = await getDataPage();
    partners.types.unshift({
      title: 'Fábrica',
      bgImage: '/images/carousel/banner1.svg',
      label: 'fabrica'
    })
    return {
      props: {
        page,
        partners,
        products,
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
      },
    };
  }
};