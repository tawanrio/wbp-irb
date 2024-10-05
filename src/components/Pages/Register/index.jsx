// Template / Layout
import Templates from '@/components/Templates'

// Components
import RegisterForm from './Forms'
import UtilityCards from '../Home/components/UtilityCards'
import { Info } from '@/components/Info'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Register({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const { title, metaTitle, metaDescription, metaKeywords } =
    content?.page || {}

  const inputs = {
    email: true,
    phone: true,
    subject: false,
    message: true,
  }

  const arrHeader = content?.template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )
  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )

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
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <RegisterForm inputs={inputs} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <UtilityCards />
          {content?.page?.info?.length > 0 && (
            <Info
              info={content.page.info}
              classNameTitle="w-full max-w-md"
              classNameContainer="pb-24"
            />
          )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
