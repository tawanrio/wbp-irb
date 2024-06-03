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


// Others || functions
import { useState } from 'react';
import { sortByKey } from '@/utils/functions';

import Utilities from '@/components/Utilities';
import DiffCarousel from './components/DiffCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import PartnersButton from './components/PartnersButton';
import UtilityCards from './components/UtilityCards';
import BlogCarousel from './components/BlogCarousel';

export default function Home({content}) {

    console.log(content);
    const [metaTitle] = useState(content?.page?.metaTitle)
    const [title] = useState(content?.page?.title)
    const [metaDescription] = useState(content?.page?.metaDescription)
    const [metaKeywords] = useState(content?.page?.metaKeywords)
    const [description] = useState(content?.page?.contentDescription)
    const [diffCarousel] = useState(content?.page?.diffCarousel)
    const [banners] = useState(content?.page?.banners)
    const [video] = useState(content?.page?.video)
    const [bannerVideo] = useState(content?.page?.banners.carousel[0])
    const [cardsValues] = useState(content?.page?.companyValues)
    const [formDefault] = useState(content?.form?.forms.find(item => item.label === "default"))
    const [posts] = useState(content.blogData)

    const sortedCategories = sortByKey(content.categories,'label')
    content.menus[2].links = sortByKey(content.menus[2].links,'label')
    content.menus[0].links[3].submenu = sortByKey(content.menus[0].links[3].submenu,'label')


   
    
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
        {/* <DiffCarousel content={diffCarousel}/> */}
        <CompanyValues cards={cardsValues}/>
        <TextVideo video={video} description={description} />
        {/* <CategoryGrid categories={sortedCategories} title /> */}
        <Categories categories={sortedCategories} colors={content?.page?.colors.products} title />
        {/* <PartnersButton partners={content?.partners?.types} /> */}
        <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>
        {/* <UtilityCards /> */}
        <Utilities title={'Utilidades'}/>
        {/* <BlogCarousel posts={posts}/> */}
        <Form inputs={formDefault} colors={content?.form?.colors}/>
      </Templates>
 
        {/* <BreadCrumb/> */}
        {/* <Title title={title}/> */}
        {/* <InsertVideo content={video}/> */}
        {/* <ContentDescription content={description}/> */}
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

