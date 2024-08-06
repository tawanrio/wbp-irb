/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'

// Database // Schema
import { connectMongoDB, disconnectMongoDB } from '@/service/db'

// Others
import { useState } from 'react'
import { useRouter } from 'next/router'
// import FormDistributor from './components/Forms/FormDistributor';
import RegisterForm from './Forms'

// Components

export default function Register({ content }) {
  const router = useRouter()
  const pageUrl = router.asPath.replace('/', '')
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)

  const inputs = {
    email: true,
    phone: true,
    subject: false,
    message: true,
  }

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords || ''} />
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
        <RegisterForm inputs={inputs} />
      </Templates>
    </>
  )
}
