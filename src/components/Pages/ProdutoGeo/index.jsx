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
import Categories from '@/components/Categories';
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
 
  const [product, setProduct] = useState(content?.product)

  console.log(content);

  useEffect(()=>{
    setProduct(getProductFromUrl(content.products, pageUrl))
  },[pageUrl])

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
  
  let partnerName
  if(content?.arrRoute[0] !== 'fabrica'){
     partnerName = content?.partners.types.find(item => item.label == content?.arrRoute[0]);
  }else{
    partnerName ={ title: 'Fábricas'}

  }

  // content.partners.types = content?.partners.types?.filter((partner)=> partner.title.toLowerCase() != content?.product[0])
  

  return (
  <>
    <Head>
       <title>{content?.category?.metaTitle || content?.category?.title}</title>
       <meta name="description" content={content?.category?.metaDescription || content?.category?.contentDescription} />
     </Head>

      <Templates template={content?.template} page={content?.page}>
          <Banner banners={content?.category?.banners} />
          <BreadCrumb/>
          <Title title={content?.category?.title}/>
          <ContentDescription content={content?.category?.partner.description}/>
          {/* <ProductModels products={product?.models} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}
          {/* <Filter select={product?.models}  title={'Modelos de Produtos'}/> */}
          {/* <FindPartners title={content?.partners?.title} product={product} partners={content?.partners?.types}  colors={content?.partners?.colors} hiddenTitle /> */}
          <SearchPartners title={`Encontre um(a) ${partnerName.title}`} collections={content?.collection} products={content?.products} arrRoute={content?.arrRoute} hiddenProductSearch />
          {/* <Faq faq={product?.faq}/> */}
          {/* <Products products={content?.products} colors={content?.page?.colors.products} title /> */}
          <Categories baseUrl={`/${content?.arrRoute[0]}/`} categories={content?.categories} colors={content?.page?.colors.products} title />
          {/* <Products products={content?.products} colors={content?.page?.colors.products} baseUrl={`/${content?.arrRoute[0]}/`} title /> */}
        <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/>
        </Templates>
    
   </>
  )
}