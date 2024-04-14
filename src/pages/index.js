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
import Categories from '@/components/Categories';
import BreadCrumb from '@/components/BreadCrumb';
import TextVideo from '@/components/TextVideo';

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menus} from '@/service/model/schemas/menusSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import {CategoriesProducts} from '@/service/model/schemas/categoriesProductsSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'
import {Form as FormDb} from '@/service/model/schemas/formsSchema'

// Others || functions
import { useState } from 'react';

import Utilities from '@/components/Utilities';

export default function QuemSomos({content}) {

    const [metaTitle] = useState(content?.page?.metaTitle)
    const [metaDescription] = useState(content?.page?.metaDescription)
    const [metaKeywords] = useState(content?.page?.metaKeywords)
    const [banners] = useState(content?.page?.banners)
    const [title] = useState(content?.page?.title)
    const [video] = useState(content?.page?.video)
    const [bannerVideo] = useState(content?.page?.banners.carousel[0])
    const [cardsValues] = useState(content?.page?.companyValues)
    const [description] = useState(content?.page?.contentDescription)
    const [formDefault] = useState(content?.form?.forms.find(item => item.label === "default"))
    
  return (
    <>
     <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
       <meta name="keywords" content={metaKeywords || ''}/>
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
     </Head>
     
    <Templates template={content?.template} page={content?.page} menus={content?.menus}>
        <Banner banners={banners} video={bannerVideo}/>
        {/* <BreadCrumb/> */}
        {/* <Title title={title}/> */}
        <CompanyValues cards={cardsValues}/>
        <TextVideo video={video} description={description} />
        {/* <InsertVideo content={video}/> */}
        {/* <ContentDescription content={description}/> */}
        <Categories categories={content?.categories} colors={content?.page?.colors.products} title />
        <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>
        <Utilities title={'Utilidades'}/>
        <Form inputs={formDefault} colors={content?.form?.colors}/>
      </Templates>
 
    </>
  )
}

async function getDataPage(){
  try{
  await connectMongoDB();

  const page = await Page.findOne({label:"home"}).lean();
  // const menu = await Menu.findOne({label:"menu"}).lean();
  const menus = await Menus.find().lean();
  const template = await Template.find();
  const partners = await SchemaCategories.findOne({label:"partners"}).lean();
  const categories = await CategoriesProducts.find().lean();
  // const products = await ProductsDb.find().lean().limit(6);
  const form = await FormDb.findOne({label: "form"}).lean();


  return {
    page:JSON.parse(JSON.stringify(page)),
    partners:JSON.parse(JSON.stringify(partners)),
    categories:JSON.parse(JSON.stringify(categories)),
    form:JSON.parse(JSON.stringify(form)),
    template:JSON.parse(JSON.stringify(template)),
    // menu:JSON.parse(JSON.stringify(menu)),
    menus:JSON.parse(JSON.stringify(menus))
  }
  }
  finally{
    disconnectMongoDB();
  }
}



export async function getStaticProps() {
  
  const content = await getDataPage();
  // const content = await testeRoute(resolvedUrl)

  return {
    props: {
      content
    },
    revalidate: 3600,
  };

};

// export const getServerSideProps  = async () => {
//   try {
//     const content = await getDataPage();
   
//     return {
//       props: {
//         content
//       }
//     };

//   } catch (error) {
//     console.error('Erro na página:', error);

//     return {
//       props: {
//         content: null
//       },
//     };
//   }
// };