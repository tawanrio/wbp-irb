// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import { Subtitle } from './components/Subtitle'
import { ListProducts } from './components/ListProducts'
import { Info } from '@/components/Info'
import { Utilities } from '../Home/components/Utilities'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Produtos({ content }) {
  const router = useRouter()
  const [fullUrl, setFullUrl] = useState('')

  const { template, page, menus, categories } = content || {}
  const {
    title,
    metaTitle,
    metaDescription,
    contentDescription: description,
    metaKeywords,
    backgroundImages,
    label,
    components: { mainTitles, info, utilities },
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
          <Title title={mainTitles?.title} />
          <Subtitle subtitle={mainTitles?.subtitle} />
          <ListProducts
            products={categories}
            className="text-white"
            classNameLink="border-[#FFFFFF4D]"
          />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={backgroundImages}>
          <Utilities className="pb-20" utilities={utilities} />
          {info?.length > 0 && (
            <Info
              info={info}
              classNameTitle="w-full max-w-[22rem]"
              classNameContainer="pb-24"
            />
          )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
