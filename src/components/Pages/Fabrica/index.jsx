// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import ContentDescription from './components/ContentDescription'
import { CompanyValuesNew } from './components/CompanyValuesNew'
import { CarouselEvent } from './components/CarouselEvents'
import { Infos } from './components/Infos'
import { Gallery } from './components/Gallery'

export default function Fabrica({ content }) {
  const {
    title,
    contentDescriptionRedesign: description,
    metaTitle,
    metaDescription,
    metaKeywords,
    events,
  } = content?.page

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
        <Infos />
        <Gallery />
        <CompanyValuesNew />
        <ContentDescription content={description} className="mb-8 mt-16" />
        <CarouselEvent events={events} />
      </Templates>
    </>
  )
}
