/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Title from '@/components/Title'

// Components
import Banner from '@/components/Banner/index'
import DynamicForm from './components/Form'

// Others || functions
import { useState } from 'react'
import { sortByKey } from '@/utils/functions'

import DiffCarouselTwo from './components/DiffCarouselTwo'
import CategoryGrid from '@/components/CategoryGrid'
import PartnersButton from './components/PartnersButton'
import UtilityCards from './components/UtilityCards'
import ServicesOverview from './components/ServicesOverview'
import ContentImgHTMLDesc from '../Categoria/components/ContentImgHTMLDesc'
import Form from '@/components/Form'

export default function Home({ content }) {
  const [metaTitle] = useState(content?.page?.metaTitle)
  const [title] = useState(content?.page?.title)
  const [metaDescription] = useState(content?.page?.metaDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)
  const [description] = useState(content?.page?.contentDescription)
  const [diffCarousel] = useState(content?.page?.components.diffCarousel)
  const [partners] = useState(content?.page?.components.partners)
  const [utilityCards] = useState(content?.page?.components.utilityCards)
  const [banners] = useState(content?.page?.banners)
  const [category] = useState(content.categories[0])
  const [servicesOverview] = useState(
    content?.page?.components.servicesOverview,
  )
  const [formDefault] = useState(content?.page.components.form)
  const [posts] = useState(content.blogData)
  console.log(content)

  // const sortedCategories = sortByKey(content.categories, 'label')
  content.menus[2].links = sortByKey(content.menus[2].links, 'label')
  // content.menus[0].links[3].submenu = sortByKey(
  //   content.menus[0].links[3].submenu,
  //   'label',
  // )

  // console.log(sortedCategories[0]);

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
          certificate={content?.page.components.certificate}
        />
        <ContentImgHTMLDesc
          textHTML={category.description}
          image={category.thumbnail}
          title={category.title}
        />
        {/* <PartnersButton partners={partners} /> */}
        {/* <UtilityCards utilityCards={utilityCards} /> */}
        <Form
          inputs={content?.form?.forms.find((item) => item.label === 'default')}
          colors={content?.form?.colors}
          title={content.page.components.form.title}
        />

        {/* <DynamicForm form={formDefault} colors={content?.form?.colors} /> */}
      </Templates>
    </>
  )
}
