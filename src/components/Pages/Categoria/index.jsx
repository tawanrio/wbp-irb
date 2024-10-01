// Template
import Templates from '@/components/Templates'

// Components
import Title from '@/components/Title'
import BreadCrumb from '@/components/BreadCrumb'
import ImgCatalogDescription from '@/components/ImgCatalogDescription'
import Ebooks from './components/Ebooks'
import ContentImgHTMLDesc from './components/ContentImgHTMLDesc'
import PartnersButton from '../Home/components/PartnersButton'
import UtilityCards from '../Home/components/UtilityCards'
import { Info } from '@/components/Info'
import { CommonQuestions } from '@/components/CommonQuestions'

// Others
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PRODUCT_CATALOG_DETAILS } from '@/utils/constants'

export default function Categoria({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [category, setCategory] = useState(content?.category)
  const [metaDescription, setMetaDescription] = useState(
    content?.category?.metaDescription,
  )

  let pageUrl = router.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  useEffect(() => {
    setCategory(content.category)
    setMetaDescription(
      content?.category?.metaDescription[0]
        .replace('{{geoName}}', '')
        .replace(/\s+\. /g, '. '),
    )
  }, [content.category, pageUrl])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>{category?.metaTitle || category?.title}</title>
        <meta
          name="description"
          content={metaDescription || category?.contentDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
        banner={content?.category?.banners}
      >
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
