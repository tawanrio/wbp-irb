// Template
import Templates from '@/components/Templates'

// Components
import { ProductDescription } from '@/components/ProductDescription'
import { Utilities } from '../Home/components/Utilities'
import PartnersButton from '../Home/components/PartnersButton'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getProductFromUrl } from '@/utils/functions'

export default function Produto({ content }) {
  const route = useRouter()
  const pageUrl = route.asPath.replace('/', '').split('/')

  const [product, setProduct] = useState(content?.product)
  const [partnerTypes] = useState(
    content?.partners?.types.filter((item) => item.label !== 'mecanicas'),
  )

  const arrHeader = content?.template?.find((item) => item?.label === 'header')
  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )
  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )

  useEffect(() => {
    setProduct(getProductFromUrl(content.products, pageUrl[1]))
  }, [content.products, pageUrl])

  return (
    <>
      <Head>
        <title>{product?.metaTitle || product?.title}</title>
        <meta
          name="description"
          content={product?.metaDescription || product?.contentDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <div className="px-5 pb-8 pt-4 sm:py-8">
            <ProductDescription product={product} />
          </div>
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <PartnersButton partnerTypes={partnerTypes} noMechanics />
          <Utilities utilities={content?.page?.components?.utilities} />
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
