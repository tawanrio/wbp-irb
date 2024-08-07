/* eslint-disable react-hooks/exhaustive-deps */
// Template
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import Title from '@/components/Title'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'
import ImgCatalogDescription from '@/components/ImgCatalogDescription'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Ebooks from './components/Ebooks'
import ContentImgHTMLDesc from './components/ContentImgHTMLDesc'
import PartnersButton from '../Home/components/PartnersButton'
import UtilityCards from '../Home/components/UtilityCards'
import { Info } from '@/components/Info'
import { PRODUCT_CATALOG_DETAILS } from '@/utils/constants'
import { CommonQuestions } from '@/components/CommonQuestions'

export default function Categoria({ content }) {
  const route = useRouter()
  let pageUrl = route.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  const [category, setCategory] = useState(content?.category)

  useEffect(() => {
    setCategory(content.category)
  }, [pageUrl])

  return (
    <>
      <Head>
        <title>{category?.metaTitle || category?.title}</title>
        <meta
          name="description"
          content={category?.metaDescription || category?.contentDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <ImgCatalogDescription content={PRODUCT_CATALOG_DETAILS} />
        {content.category.ebook && <Ebooks ebooks={content.category.ebook} />}
        <PartnersButton partners={content?.partners?.types} />
        <UtilityCards />
        {content?.category?.info?.length > 0 && (
          <Info info={content.category.info} />
        )}
        {content?.category?.faq &&
          Object.entries(content.category.faq).length > 0 && (
            <CommonQuestions faq={content.category.faq} />
          )}
      </Templates>
    </>
  )
}
