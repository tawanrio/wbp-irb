// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import { Description } from './components/Description'
import SearchPartners from '@/components/SearchPartners'
import { CarouselScale } from '@/components/Carousel/CarouselScale'
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

export default function Autoparts({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const { template, page, menus, collection, products, geo } = content || {}
  const {
    title,
    metaTitle,
    metaDescription,
    contentDescription: description,
    metaKeywords,
    backgroundImages,
    label,
    info,
    faq,
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
  }, [router])

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>
      <Templates template={template} page={page} menus={menus}>
        <BackgroundImageFirst backgrounds={backgroundImages}>
          <Header content={header} page={label} />
          <Title title={title} />
          <Description description={description} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={backgroundImages}>
          <SearchPartners
            partnerType="autopeça"
            collections={collection}
            hiddenProductSearch
            products={products}
            geo={geo}
          />
          <CarouselScale options={OPTIONS} array={content?.categories}>
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
          {/* {info?.length > 0 && <Info info={info} />} */}
          {faq && Object.entries(faq).length > 0 && (
            <CommonQuestions faq={faq} />
          )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
