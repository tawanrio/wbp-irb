/* eslint-disable no-undef */
'use client'

// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import PartnersButton from './components/PartnersButton'
import UtilityCards from './components/UtilityCards'
import { BlogCarousel } from './components/BlogCarousel'
import ServicesOverview from './components/ServicesOverview'
import { FormHome } from '@/components/Form/Home'
import { ListProduct } from '@/components/ListProduct'
import Banner from '@/components/Banner'
// import { Info } from '@/components/Info'

// Others || functions
import { useState, useEffect } from 'react'
import { sortByKey } from '@/utils/functions'
import { cn } from '@/utils/cn'

export default function Home({ content }) {
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [title] = useState(content?.page?.title)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)
  const [description] = useState(content?.page?.contentDescription)
  const [banners] = useState(content?.page?.banners)
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )
  const [posts] = useState(content.blogData)
  const [showBanner, setShowBanner] = useState(true)

  const sortedCategories = sortByKey(content.categories, 'label')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowBanner(false)
      } else {
        setShowBanner(true)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
        banner={banners}
        style={'home'}
      >
        <ServicesOverview />
        <ListProduct categories={sortedCategories} />
        {showBanner && <Banner banners={banners} page={content?.page} />}
        <PartnersButton className={cn(!showBanner && '!max-w-full bg-white')} />
        <UtilityCards />
        <BlogCarousel posts={posts} />
        <FormHome inputs={formDefault} />
        {/* {content?.page?.info?.length > 0 && <Info info={content.page.info} />} */}
      </Templates>
    </>
  )
}

async function getDataPage() {
  try {
    await connectMongoDB()

    const page = await Page.findOne({ label: 'home' }).lean()
    const menus = await Menus.find().lean()
    const template = await Template.find()
    const partners = await SchemaCategories.findOne({
      label: 'partners',
    }).lean()
    const categories = await CategoriesProducts.find().lean()
    const form = await FormDb.findOne({ label: 'form' }).lean()

    return {
      page: JSON.parse(JSON.stringify(page)),
      partners: JSON.parse(JSON.stringify(partners)),
      categories: JSON.parse(JSON.stringify(categories)),
      form: JSON.parse(JSON.stringify(form)),
      template: JSON.parse(JSON.stringify(template)),
      menus: JSON.parse(JSON.stringify(menus)),
    }
  } finally {
    disconnectMongoDB()
  }
}

export async function getStaticProps() {
  const content = await getDataPage()

  return {
    props: {
      content,
    },
    revalidate: 3600,
  }
}
