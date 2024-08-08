// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'

// Database // Schema
import Categories from '@/components/Categories'

// Components
import ContentDescription from '@/components/ContentDescription'
import BreadCrumb from '@/components/BreadCrumb'
import ContentImgDescription from '@/components/ContentImgDescription'
import Title from '@/components/Title'
import Partners from '@/components/Partners'
import SearchPartners from '@/components/SearchPartners'

// Others
import { useRouter } from 'next/router'
import { Info } from '@/components/Info'
import { CommonQuestions } from '@/components/CommonQuestions'

export default function Distribuidoras({ content }) {
  const router = useRouter()
  const pageUrl = router.asPath.replace('/', '')
  const {
    banners,
    title,
    metaTitle,
    metaDescription,
    contentDescription: description,
    imgDescription,
    metaKeywords,
  } = content?.page

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <Title title={title} />
        <ContentDescription content={description} />
        <SearchPartners
          partnerType="distribuidor"
          title="Encontre um distribuidor"
          collections={content?.collection}
          hiddenProductSearch
          products={content?.products}
          geo={content?.geo}
        />
        <ContentImgDescription content={imgDescription} />
        <Categories
          baseUrl={`${pageUrl}/`}
          categories={content?.categories}
          colors={content?.page?.colors.products}
          title
        />
        <Partners
          title={'Nossos parceiros'}
          partners={content?.partners?.types}
          colors={content?.partners?.colors}
        />
        {content?.page?.info?.length > 0 && <Info info={content.page.info} />}
        {content?.page?.faq && Object.entries(content.page.faq).length > 0 && (
          <CommonQuestions faq={content.page.faq} />
        )}
      </Templates>
    </>
  )
}
