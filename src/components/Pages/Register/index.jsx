// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'

// Components
import RegisterForm from './Forms'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Register({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const { banners, title, metaTitle, metaDescription, metaKeywords } =
    content?.page || {}

  const inputs = {
    email: true,
    phone: true,
    subject: false,
    message: true,
  }

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
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords || ''} />
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
        <RegisterForm inputs={inputs} />
      </Templates>
    </>
  )
}
