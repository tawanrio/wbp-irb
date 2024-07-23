/* eslint-disable @typescript-eslint/no-unused-vars */
// Template / Layout
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import BreadCrumb from '@/components/BreadCrumb'
import Banner from '@/components/Banner/index'
import ImgCatalogDescription from '@/components/ImgCatalogDescription'
// Database // Schema

// Context Api
import { useState } from 'react'
import ContentImgHTMLDesc from '../Categoria/components/ContentImgHTMLDesc'
import ButtonCta from '@/components/ButtonCta'
import SectionTitle from '@/components/SectionTitle'

export default function Service({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [service] = useState(content?.page.service)
  const [description] = useState(content?.page.contentDescription)

  console.log(content)

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
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
        <Banner banners={banners} />
        <BreadCrumb />
        <section
          className="flex flex-col items-center"
          id={`content-img-description_`}
        >
          <div className="my-4 flex w-full max-w-7xl flex-col px-6 md:mb-[-20px] md:mt-10 md:justify-between md:gap-10 md:px-14">
            <SectionTitle title={content.page.title} />
          </div>
        </section>
        <ContentImgHTMLDesc
          textHTML={service?.contentHTML}
          image={service?.image}
        />
        {service.button.url && (
          <ButtonCta button={service.button} className={'mt-[-50px]'} />
        )}
      </Templates>
    </>
  )
}
