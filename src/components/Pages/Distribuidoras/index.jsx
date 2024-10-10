// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Description } from './components/Description'
import { Title } from './components/Title'
import { CarouselScale } from '@/components/Carousel/CarouselScale'
import SearchPartners from '@/components/SearchPartners'
import { Product } from '@/components/Product'
import { Info } from '@/components/Info'
import { CommonQuestions } from '@/components/CommonQuestions'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { OPTIONS } from '@/utils/constants'

export default function Distribuidoras({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )

  const { template, page, menus, collection, products, geo } = content || {}
  const {
    banners,
    title,
    metaTitle,
    contentDescription: description,
    metaKeywords,
  } = page || {}

  const arrHeader = template.find((item) => item.label === 'header')
  const header = arrHeader.items.find((item) => item.label === 'redesign-home')
  const footer = template.find((item) => item.label === 'footer')
  const copyright = template.find((item) => item.label === 'copyright')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
    setMetaDescription(
      content?.page?.metaDescription[0].replace(
        '{{geoName}}',
        'IRB Automotive',
      ),
    )
  }, [content?.page?.metaDescription, fullUrl, router])

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>
      <Templates template={template} page={page} menus={menus} banner={banners}>
        <BackgroundImageFirst backgrounds={page?.backgroundImages}>
          <Header content={header} page={page?.label} />
          <Title title={title} />
          <Description description={description} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={page?.backgroundImages}>
          <SearchPartners
            partnerType="distribuidor"
            collections={collection}
            hiddenProductSearch
            products={products}
            geo={geo}
          />
          <CarouselScale options={OPTIONS}>
            {content?.categories.slice(0, 6).map((category) => (
              <li className="embla__slide" key={category._id}>
                <Product
                  category={{
                    ...category,
                    label: `${page?.label}/${category.label}`,
                  }}
                  className="embla__slide__number border-[#0000004D] text-black"
                />
              </li>
            ))}
          </CarouselScale>
          {content?.page?.info?.length > 0 && <Info info={content.page.info} />}
          {content?.page?.faq &&
            Object.entries(content.page.faq).length > 0 && (
              <CommonQuestions faq={content.page.faq} />
            )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
