// Template
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import { Subtitle } from './components/Subtitle'
import SearchPartners from '@/components/SearchPartners'
import { Info } from '@/components/Info'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
import { capitalize } from '@/utils/functions'

export default function Produto({ content }) {
  const router = useRouter()
  const pathname = usePathname()
  let pageUrl = router.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  const [fullUrl, setFullUrl] = useState('')
  const [metaTitle] = useState(content?.category?.partner?.metaTitle)
  const [metaKeywords] = useState(content?.category?.metaKeywords)
  const [metaDescription, setMetaDescription] = useState(
    content?.page?.metaDescription,
  )

  let partnerName
  if (content?.arrRoute[0] !== 'fabrica') {
    partnerName = content?.partners.types.find(
      (item) => item.label === content?.arrRoute[0],
    )
  } else {
    partnerName = { title: 'Fábricas' }
  }

  const arrHeader = content?.template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )
  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )

  useEffect(() => {
    setMetaDescription(
      content?.category?.metaDescription[0]?.replace(
        '{{geoName}}',
        `em ${capitalize(pathname.split('/').pop())}`,
      ),
    )
  }, [
    content?.category?.metaDescription,
    content.page.metaDescription,
    content.products,
    pageUrl,
    pathname,
  ])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      setFullUrl(url)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>{metaTitle || content?.category?.title}</title>
        <meta
          name="description"
          content={metaDescription || content?.category?.contentDescription}
        />
        <meta name="keywords" content={metaKeywords || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={fullUrl} />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <Title title={content?.category?.partner?.title} />
          <Subtitle subtitle={content?.page?.mainTitles?.subtitle} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <SearchPartners
            geo={content?.geo}
            title={`Encontre um(a) ${partnerName.title}`}
            collections={content?.collection}
            products={content?.products}
            arrRoute={content?.arrRoute}
            hiddenProductSearch
          />
          {content?.page?.info?.length > 0 && (
            <Info
              info={content.page.info}
              classNameTitle="w-full max-w-[22rem]"
              classNameContainer="pb-20"
            />
          )}
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
