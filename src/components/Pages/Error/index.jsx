// Template / Layout
import Templates from '@/components/Templates'

// Components
import { Title } from './components/Title'
import Error from '@/components/Error'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'

// Others
import Head from 'next/head'

export default function index({ content }) {
  const { template, page, menus } = content || {}
  const {
    title,
    contentDescription: description,
    metaTitle,
    metaDescription,
    components,
    backgroundImages,
    label,
  } = page || {}

  const arrHeader = template.find((item) => item.label === 'header')
  const header = arrHeader.items.find((item) => item.label === 'redesign-home')
  const footer = template.find((item) => item.label === 'footer')
  const copyright = template.find((item) => item.label === 'copyright')

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Templates template={template} page={page} menus={menus}>
        <BackgroundImageFirst backgrounds={backgroundImages}>
          <Header content={header} page={label} />
          <Title title={title} />
        </BackgroundImageFirst>
        <Error content={components} />
        <BackgroundImageLast backgrounds={backgroundImages}>
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
