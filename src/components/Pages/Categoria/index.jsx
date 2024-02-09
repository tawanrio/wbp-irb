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
import Utilities from '@/components/Utilities';
import Categories from '@/components/Categories';
import ImgCatalogDescription from '@/components/ImgCatalogDescription';
import SearchProducts from '@/components/SearchProducts';

// Database // Schema
import {Categories as SchemaCategories} from '@/service/model/schemas/categoriesSchema'
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import Page from '@/service/model/schemas/pageSchema'
import {Menu} from '@/service/model/schemas/menuSchema'
import {Template} from '@/service/model/schemas/templateSchema'
import {Products as ProductsDb} from '@/service/model/schemas/productsSchema'


// Others
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {getProductFromUrl,insertMenuInTemplate} from '@/utils/functions'

export default function Categoria({ content }) {
  const route = useRouter()
  let pageUrl = route.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]
 
  const [category, setCategory] = useState(content?.category)

  useEffect(()=>{
    setCategory(content.category)
    

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
  
  const catalogDescription = {
   imageProduct : {
    imageUrl: '/images/partners/bannerIRB.png',
    alt:"catalogo online"
  },
  title: 'Baixe agora mesmo o catálogo eletrônico e consulte facilmente toda nossa linha de produtos.',
  subtitle:'Acesse pelo celular',
   button : [
     {
       title: '',
       alt: 'appstore',
       image: '/images/products/appstore.png',
       link: 'https://apps.apple.com/br/app/irb-cat%C3%A1logo/id1169028455'
      },
      {
        title: '',
        alt: 'google-play',
        image: '/images/products/google-play.png',
       link: 'https://play.google.com/store/apps/details?id=br.com.ideia2001.CatalogoIRB'
      },
    ],

   description : [
    "Baixe agora nosso catálogo online e tenha acesso a uma ampla seleção de produtos automotivos de alta qualidade.",
    "Explore nossa vasta gama de peças e componentes para atender às necessidades do seu veículo.",
    "Encontre tudo o que você precisa para manter seu carro funcionando perfeitamente, desde filtros de óleo até sistemas de freios.",
    "Baixe nosso catálogo hoje mesmo e descubra as melhores soluções para a manutenção e reparo do seu veículo!"
]
  }
  return (
  <>
    <Head>
       <title>{category?.metaTitle || category?.title}</title>
       <meta name="description" content={category?.metaDescription || category?.contentDescription} />
     </Head>

      <Templates template={content?.template} page={content?.page}>
          <Banner banners={content?.category?.banners} />
          <BreadCrumb/>
          <Title title={category?.title}/>
          <ContentDescription content={category?.contentDescription}/>
          <ImgCatalogDescription content={catalogDescription}/>

          {/* <ProductModels products={product?.models} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}

          <SearchProducts  title="Encontre seu produto" hiddenProductSearch  products={content?.products} />

          {/* <Filter select={product?.models}  title={'Modelos de Produtos'}/> */}
          {/* <FindPartners partners={content?.partners} /> */}
          <FindPartners title={content?.partners?.title} product={category} partners={content?.partners?.types}  colors={content?.partners?.colors} hiddenTitle />
          <Utilities title={'Utilidades'}/>
        </Templates>
    
   </>
  )
}
