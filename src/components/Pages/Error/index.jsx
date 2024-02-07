// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from "@/components/Banner";

// Others
import { useState} from 'react';
import  {useRouter}  from 'next/router';
import { insertMenuInTemplate } from '@/utils/functions'

// Components
import BreadCrumb from '@/components/BreadCrumb';
import Error from '@/components/Error';
import {formatStrToUrl} from '@/utils/functions'

export default function index({content}) {
    const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [imgDescription] = useState(content?.page.imgDescription)
  const [faq] = useState(content?.page.faq)

  // content.collection?.filter(partner => {
  //   partner.info.address.find(address => {
  //     if(address.label === 'default'){
  //     console.log(formatStrToUrl(address.city) === content.arrRoute[2]);
  //     }
  //   });
  // });


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
       <Error/>
       {/* <Title title={title}/> */}
       {/* <ContentDescription content={description}/> */}
       {/* <Products baseUrl={`/${pageUrl}/`} products={content?.products} colors={content?.page?.colors.products} title={'Produtos'} /> */}
       {/* <ContentImgDescription content={imgDescription}/> */}
    </Templates>
    </>
  )
}
