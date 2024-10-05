/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'

// Others
import { useState } from 'react'
import { useRouter } from 'next/router'
import { insertMenuInTemplate, formatStrToUrl } from '@/utils/functions'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import Error from '@/components/Error'

export default function index({ content }) {
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [imgDescription] = useState(content?.page.imgDescription)
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
        <Error />
        {/* <Title title={title}/> */}
        {/* <ContentDescription content={description}/> */}
        {/* <Products baseUrl={`/${pageUrl}/`} products={content?.products} colors={content?.page?.colors.products} title={'Produtos'} /> */}
        {/* <ContentImgDescription content={imgDescription}/> */}
      </Templates>
    </>
  )
}
