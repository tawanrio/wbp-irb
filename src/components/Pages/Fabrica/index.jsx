/* eslint-disable @typescript-eslint/no-unused-vars */
// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from '@/components/Banner/index'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { sortByKey } from '@/utils/functions'

// Components
import ContentDescription from '@/components/ContentDescription'
import BreadCrumb from '@/components/BreadCrumb'
import CompanyValuesNew from './components/CompanyValuesNew'
import ContentImgDescription from '@/components/ContentImgDescription'
import Products from '@/components/Products'
import Categories from '@/components/Categories'
import Faq from '@/components/Faq'
import Title from '@/components/Title'
import InsertVideo from '@/components/InsertVideo'
import Utilities from '@/components/Utilities'
import TimeLine from './components/TimeLine'
import TimeLineNew from './components/TimeLineNew'
import CarouselEvent from './components/CarouselEvents'
import CategoryGrid from '@/components/CategoryGrid'

export default function Fabrica({ content }) {
  const [banners, setBanners] = useState(content?.page.banners)
  const [title, setTitle] = useState(content?.page.title)
  const [description, setDescription] = useState(
    content?.page.contentDescription,
  )
  const [metaTitle, setMetaTitle] = useState(content?.page.metaTitle)
  const [companyValues, setCompanyValues] = useState(
    content?.page?.components.companyValues,
  )
  const [metaDescription, setMetaDescription] = useState(
    content?.page.metaDescription,
  )
  const [timeLine, setTimeLine] = useState(content?.page.components.timeLine)
  const [metaKeywords, setMetaKeywords] = useState(content?.page?.metaKeywords)
  const [events, setEvents] = useState(content?.page?.components.events)

  const [sortedCategories, setSortedCategories] = useState(
    sortByKey(content.categories, 'label'),
  )
  useEffect(() => {
    // Atualiza os estados quando o idioma muda
    // MetaData
    setTitle(content?.page.title)
    setMetaTitle(content?.page.metaTitle)
    setDescription(content?.page.contentDescription)
    setMetaDescription(content?.page.metaDescription)
    setMetaKeywords(content?.page?.metaKeywords)
    // Components
    setBanners(content?.page.banners)
    setCompanyValues(content?.page?.components.companyValues)
    setTimeLine(content?.page.components.timeLine)
    setEvents(content?.page?.components.events)
    setSortedCategories(sortByKey(content.categories, 'label'))
  }, [content])

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
        <BreadCrumb />
        <Title title={title} className={'mt-5'} />
        <ContentDescription content={description} className={'mt-5'} />
        <TimeLineNew timeLine={timeLine} />
        <CompanyValuesNew companyValues={companyValues} />
        <CategoryGrid categories={sortedCategories} title />
        {/* <CarouselEvent events={events}/> */}
        {/* <InsertVideo content={video}/> */}
        {/* <Categories baseUrl={`/`} categories={content?.categories} colors={content?.page?.colors.products} title /> */}
        {/* <Products baseUrl={`${pageUrl}/`} products={content?.products} colors={content?.page?.colors.products} title/> */}
        {/* <Utilities title={'Utilidades'}/> */}
      </Templates>
    </>
  )
}
