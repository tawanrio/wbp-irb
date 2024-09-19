/* eslint-disable @typescript-eslint/no-unused-vars */
// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import Banner from '@/components/Banner/index'
// Database // Schema

// Context Api
import { useState } from 'react'
import Container from '@/components/Container'

export default function Service({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [service] = useState(content?.page.service)
  const [description] = useState(content?.page.contentDescription)

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
        <Container>ola</Container>
      </Templates>
    </>
  )
}
