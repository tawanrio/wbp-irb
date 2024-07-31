/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Template
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import ContentDescription from '@/components/ContentDescription'
import Title from '@/components/Title'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'
import ProductModels from '@/components/Products/ProductModels'
import Faq from '@/components/Faq'
import Filter from '@/components/Filter'
import FindPartners from '@/components/FindPartners'
import Partners from '@/components/Partners'
import Utilities from '@/components/Utilities'
import Categories from '@/components/Categories'
import ImgCatalogDescription from '@/components/ImgCatalogDescription'
import SearchProducts from '@/components/SearchProducts'

// Database // Schema
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menu } from '@/service/model/schemas/menuSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProductFromUrl, insertMenuInTemplate } from '@/utils/functions'
import Ebooks from './components/Ebooks'
import ContentImgDescription from '@/components/ContentImgDescription'
import ContentImgHTMLDesc from './components/ContentImgHTMLDesc'
import PartnersButton from '../Home/components/PartnersButton'
import UtilityCards from '../Home/components/UtilityCards'

export default function Categoria({ content }) {
  const route = useRouter()
  let pageUrl = route.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  const [category, setCategory] = useState(content?.category)
  const [partners, setPartners] = useState(content?.page?.components.partners)
  const [catalogDescription, setCatalogDescription] = useState(
    content?.page?.components.catalogDescription,
  )
  const [utilityCards] = useState(content?.page?.components.utilityCards)

  useEffect(() => {
    setCategory(content.category)
    setCatalogDescription(content?.page?.components.catalogDescription)
    setPartners(content?.page?.components.partners)
  }, [pageUrl, content])

  return (
    <>
      <Head>
        <title>{category?.metaTitle || category?.title}</title>
        <meta
          name="description"
          content={category?.metaDescription || category?.contentDescription}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={content?.category?.banners} />
        <BreadCrumb />
        <Title title={category?.title} />
        <ContentImgHTMLDesc
          textHTML={category.description}
          image={category.thumbnail}
        />
        <ImgCatalogDescription content={catalogDescription} />

        {content.category.ebook && <Ebooks ebooks={content.category.ebook} />}

        <PartnersButton partners={partners} />
        <UtilityCards utilityCards={utilityCards} />
        {/* <PartnersButton partners={content?.partners?.types} /> */}

        {/* <UtilityCards />  */}
      </Templates>
    </>
  )
}
