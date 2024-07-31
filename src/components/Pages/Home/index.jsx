/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title'

// Components
import Banner from '@/components/Banner/index'
import ContentDescription from '@/components/ContentDescription'
import InsertVideo from '@/components/InsertVideo'
import Partners from '@/components/Partners'
import Form from '@/components/Form'
import CompanyValues from '@/components/CompanyValues'
import Categories from '@/components/Categories'
import BreadCrumb from '@/components/BreadCrumb'
import TextVideo from '@/components/TextVideo'

// Others || functions
import { useState } from 'react'
import { sortByKey } from '@/utils/functions'

import Utilities from '@/components/Utilities'
import DiffCarousel from './components/DiffCarousel'
import DiffCarouselTwo from './components/DiffCarouselTwo'
import CategoryGrid from '@/components/CategoryGrid'
import PartnersButton from './components/PartnersButton'
import UtilityCards from './components/UtilityCards'
import BlogCarousel from './components/BlogCarousel'
import ServicesOverview from './components/ServicesOverview'

export default function Home({ content, locale }) {
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [title] = useState(content?.page?.title)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)
  const [description] = useState(content?.page?.contentDescription)
  const [banners] = useState(content?.page?.banners)
  const [utilityCards] = useState(content?.page?.components.utilityCards)
  const [diffCarousel] = useState(content?.page?.components.diffCarousel)
  const [categories] = useState(content?.page?.components.categories)
  const [partners] = useState(content?.page?.components.partners)
  const [servicesOverview] = useState(
    content?.page?.components.servicesOverview,
  )
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )
  const [posts] = useState(content.blogData)

  const sortedCategories = sortByKey(content.categories, 'label')
  content.menus[2].links = sortByKey(content.menus[2].links, 'label')
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
        <Banner banners={banners} stlyeText={true} />
        <ServicesOverview
          content={servicesOverview}
          certificate={content?.page.certificate}
        />
        {/* <DiffCarousel content={diffCarousel}/> */}
        <DiffCarouselTwo content={diffCarousel} />
        {/* <CompanyValues cards={cardsValues}/> */}
        {/* <TextVideo video={video} description={description} /> */}
        <CategoryGrid categories={sortedCategories} title={categories.title} />
        {/* <Categories categories={sortedCategories} colors={content?.page?.colors.products} title /> */}
        <PartnersButton partners={partners} />
        {/* <Partners title={"Nossos parceiros"} partners={content?.partners?.types}  colors={content?.partners?.colors}/> */}
        <UtilityCards utilityCards={utilityCards} />
        {/* <Utilities title={'Utilidades'}/> */}
        <BlogCarousel posts={posts} />
        <Form
          inputs={formDefault}
          colors={content?.form?.colors}
          title={content.page.components.form.title}
        />
      </Templates>
    </>
  )
}
