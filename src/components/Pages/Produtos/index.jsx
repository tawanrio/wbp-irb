/* eslint-disable @typescript-eslint/no-unused-vars */
// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'
import Products from '@/components/Products'
import Faq from '@/components/Faq'

// Others
import { useState } from 'react'
import { useRouter } from 'next/router'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menu } from '@/service/model/schemas/menuSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'

// Util
import { insertMenuInTemplate } from '@/utils/functions'

export default function Produtos({ content }) {
  const router = useRouter()
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [faq] = useState(content?.page.faq)

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <Products
          products={content?.products}
          colors={content?.page.colors}
          page
        />
        {/* <Faq faq={faq}/> */}
      </Templates>
    </>
  )
}

// async function getDataPage(){
//   try{
//   await connectMongoDB();

//   const page = await Page.findOne({label:"partners"}).lean();
//   const menu = await Menu.findOne({label:"menu"}).lean();
//   const template = await Template.find();
//   const products = await ProductsDb.find().lean().limit(6);

//   return {
//     page:JSON.parse(JSON.stringify(page)),
//     products:JSON.parse(JSON.stringify(products)),
//     template:JSON.parse(JSON.stringify(template)),
//     menu:JSON.parse(JSON.stringify(menu))
//   }
//   }
//   finally{
//     disconnectMongoDB();
//   }
// }

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
//         content
//       },
//     };
//   }
// };
