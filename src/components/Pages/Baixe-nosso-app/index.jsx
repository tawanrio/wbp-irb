// Template / Layout
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import Banner from '@/components/Banner/index'
import ImgCatalogDescription from '@/components/ImgCatalogDescription'

// Others
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CATALOGS_DESCRIPTION } from '@/utils/constants'

export default function BaixeNossoApp({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const {
    metaTitle,
    metaDescription,
    banners,
    title,
    contentDescription: description,
  } = content?.page || {}

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <ImgCatalogDescription
          className="mt-10"
          content={CATALOGS_DESCRIPTION}
        />
      </Templates>
    </>
  )
}
