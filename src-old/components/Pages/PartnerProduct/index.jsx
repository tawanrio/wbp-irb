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
import FindPartners from '@/components/FindPartners';
import Partners from '@/components/Partners';
import SearchPartners from '@/components/SearchPartners';
import Products from '@/components/Products';

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

export default function Produto({ content }) {
  const route = useRouter()
  let pageUrl = route.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]
 
  const [product, setProduct] = useState(content?.arrRoute)
  const [arrRoute, setArrRoute] = useState(content?.arrRoute)

console.log(content);
  useEffect(()=>{
    setProduct(getProductFromUrl(content.products, pageUrl))
    
  },[pageUrl])

  insertMenuInTemplate({
menu:content?.menu,
    template: content?.template, 
menu:content?.menu,
    template: content?.template,  
    menuName: "header",
    itemTemplateName:"default",
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



  const replaceShortcodeProduct = (text, product ) => {
    const shortcode = '{{product}}';
    const hasShortcode = text.includes(shortcode);
    if (hasShortcode) {
      return text.replace(shortcode, product);
    }
    return text;
  };
  
  const replaceShortcodePartner = (text, partner) => {
    const shortcode = '{{partner}}';
    const hasShortcode = text.includes(shortcode);
    if (hasShortcode) {
      return text.replaceAll(shortcode, partner);
    }
    return text;
  };

  
  // (product.partner?.description) && (product.partner.description[0] = replaceShortcodeProduct(product?.partner?.description[0], `${content?.arrRoute[1]}s` ));
  let partnerName
  if(content?.arrRoute[0] !== 'fabrica'){
     partnerName = content?.partners.types.find(item => item.label == content?.arrRoute[0]);
  }else{
    partnerName ={ title: 'Fábricas'}

  }
  (product?.partner?.description) &&(product.partner.description[0] = replaceShortcodePartner( product?.partner?.description[0], `das nossas ${partnerName?.title}`));
  
  
  return (
  <>
    <Head>
       <title>{product?.metaTitle || product?.title}</title>
       <meta name="description" content={product?.metaDescription || product?.contentDescription} />
     </Head>

       <Templates template={content?.template} page={content?.page} menus={content?.menus}>
          <Banner banners={product?.banners} />
          <BreadCrumb/>
          <Title title={product?.partner?.title}/>
          <ContentDescription content={product?.partner?.description}/>
          {/* <ProductModels products={product?.models} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}
          {/* <Filter select={product?.models}  title={'Modelos de Produtos'}/> */}
          {/* <FindPartners title={content?.partners?.title} product={product} partners={content?.partners?.types}  colors={content?.partners?.colors} hiddenTitle /> */}
          <SearchPartners collections={content?.collection} products={content?.products} hiddenProductSearch />
          {/* <Faq faq={product?.faq}/> */}
          {/* <Products products={content?.products} colors={content?.page?.colors.products} title /> */}
          <Products products={content?.products} colors={content?.page?.colors.products} baseUrl={`/${content?.arrRoute[0]}/`} title />
        <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>
        </Templates>
    
   </>
  )
}
