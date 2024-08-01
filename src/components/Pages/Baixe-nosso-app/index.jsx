// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import Banner from '@/components/Banner/index'
import ImgCatalogDescription from '@/components/ImgCatalogDescription'
// Database // Schema

// Context Api
import { useState } from 'react'

export default function BaixeNossoApp({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [catalogDescription] = useState(
    content?.page.components.catalogDescription,
  )

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
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
        <Banner banners={banners} />
        <BreadCrumb />
        <ImgCatalogDescription
          className={'mt-10'}
          content={catalogDescription}
        />
      </Templates>
    </>
  )
}
