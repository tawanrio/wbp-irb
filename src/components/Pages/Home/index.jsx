/* eslint-disable no-undef */
'use client'

// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import PartnersButton from './components/PartnersButton'
import { Utilities } from './components/Utilities'
import { BlogCarousel } from './components/BlogCarousel'
import ServicesOverview from './components/ServicesOverview'
import { FormHome } from '@/components/Form/Home'
import { ListProduct } from '@/components/ListProduct'
import Banner from '@/components/Banner'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others || functions
import { useState, useEffect } from 'react'
import { sortByKey } from '@/utils/functions'
import { useRouter } from 'next/router'
import { BannerMobile } from './components/BannerMobile'

export default function Home({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [isMobile, setIsMobile] = useState(false)

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
  const [posts] = useState(content.blogData)

  const sortedCategories = sortByKey(content.categories, 'label')

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 760)

      const handleResize = () => {
        setIsMobile(window.innerWidth < 760)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    } else {
      setIsMobile(false)
    }
  }, [])

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
          <ListProduct categories={sortedCategories} />
          {isMobile ? (
            <BannerMobile banners={banners} />
          ) : (
            <Banner banners={banners} page={content?.page} />
          )}
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <PartnersButton />
          <Utilities utilities={utilities} />
          <BlogCarousel posts={posts} />
          <FormHome inputs={formDefault} />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
