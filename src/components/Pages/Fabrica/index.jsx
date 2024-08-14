// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import ContentDescription from '@/components/ContentDescription'
import BreadCrumb from '@/components/BreadCrumb'
import CompanyValuesNew from './components/CompanyValuesNew'
import Title from '@/components/Title'
import TimeLineNew from './components/TimeLineNew'
import CarouselEvent from './components/CarouselEvents'
import CategoryGrid from '@/components/CategoryGrid'

// Others
import { sortByKey } from '@/utils/functions'

export default function Fabrica({ content }) {
  const {
    title,
    contentDescription: description,
    metaTitle,
    metaDescription,
    metaKeywords,
    events,
  } = content?.page

  const sortedCategories = sortByKey(content.categories, 'label')

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
        banner={content.page.banners}
        style={true}
      >
        <BreadCrumb />
        <Title title={title} className={'mt-5'} />
        <ContentDescription content={description} className={'mt-5'} />
        <TimeLineNew />
        <CompanyValuesNew />
        <CategoryGrid categories={sortedCategories} title />
        <CarouselEvent events={events} />
      </Templates>
    </>
  )
}
