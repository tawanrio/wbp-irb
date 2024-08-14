/* eslint-disable no-undef */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import Form from '@/components/Form'

// Others || functions
import { useState } from 'react'
import { sortByKey } from '@/utils/functions'

import DiffCarouselTwo from './components/DiffCarouselTwo'
import CategoryGrid from '@/components/CategoryGrid'
import PartnersButton from './components/PartnersButton'
import UtilityCards from './components/UtilityCards'
import { BlogCarousel } from './components/BlogCarousel'
import ServicesOverview from './components/ServicesOverview'
import { Info } from '@/components/Info'

export default function Home({ content }) {
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [title] = useState(content?.page?.title)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)
  const [description] = useState(content?.page?.contentDescription)
  const [diffCarousel] = useState(content?.page?.diffCarousel)
  const [banners] = useState(content?.page?.banners)
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )
  const [posts] = useState(content.blogData)

  const sortedCategories = sortByKey(content.categories, 'label')
  // content.menus[2].links = sortByKey(content.menus[2].links, 'label')
  // content.menus[0].links[3].submenu = sortByKey(
  //   content.menus[0].links[3].submenu,
  //   'label',
  // )

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
        <DiffCarouselTwo content={diffCarousel} />
        <CategoryGrid categories={sortedCategories} title />
        <PartnersButton partners={content?.partners?.types} />
        <UtilityCards />
        <BlogCarousel posts={posts} />
        <Form inputs={formDefault} colors={content?.form?.colors} />
        {content?.page?.info?.length > 0 && <Info info={content.page.info} />}
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
