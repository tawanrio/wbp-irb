/* eslint-disable no-undef */
'use client'

// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Utilities } from './components/Utilities'
import ServicesOverview from './components/ServicesOverview'
import { FormHome } from '@/components/Form/Home'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import { ContentProduct } from '@/components/Pages/Categoria/components/ContentProduct'

// Others || functions
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [title] = useState(content?.page?.title)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)
  const [description] = useState(content?.page?.contentDescription)
  const [banners] = useState(content?.page?.banners)
  const [serviceOverview] = useState(
    content?.page?.components.servicesOverviewNew,
  )
  const [utilities] = useState(content?.page?.components.utilities)
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )
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
        <meta name="description" content={metaDescription || description} />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
        banner={banners}
        style="home"
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <ServicesOverview content={serviceOverview} />
          <ContentProduct
            category={content?.categories[0]}
            technicalSheet={content?.page?.components.technicalSheet}
          />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <Utilities utilities={utilities} />
          <FormHome inputs={formDefault} />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
