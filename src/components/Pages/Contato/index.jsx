// Template
import Templates from '@/components/Templates'

// Components
import Banner from '@/components/Banner/index'
import { BackgroundImageFirst } from '@/components/BackgroundImage/first'
import { BackgroundImageLast } from '@/components/BackgroundImage/last'
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import Description from './components/Description'
import { Maps } from '@/components/Maps'
import { FormContact } from './components/Form/'
import { TellButton } from './components/TellButton'
import Container from '@/components/Container'
import { useIntl } from 'react-intl'

// Others
import { useState } from 'react'
import Head from 'next/head'
import { getGoogleMaps } from '@/utils/functions'
import { CONTACT_BANNER } from '@/utils/constants'

export default function Contato({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [newDescription] = useState(content?.page.components.description)
  const [logoContact] = useState(content?.page.components.logoContact)
  const [arrButton] = useState(logoContact?.arrButton)
  const [collections] = useState([content?.collection])
  const [formDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )
  const intl = useIntl()
  const messages = intl.messages

  const googleMapsUrl = getGoogleMaps(false)
  const arrHeader = content?.template?.find((item) => item?.label === 'header')

  const header = arrHeader?.items.find(
    (item) => item?.label === 'redesign-home',
  )

  const footer = content?.template?.find((item) => item?.label === 'footer')
  const copyright = content?.template?.find(
    (item) => item?.label === 'copyright',
  )

  return (
    <>
      <Head>
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription || description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Templates
        template={content?.template}
        page={content?.page}
        menus={content?.menus}
        banner={content.page.banners}
        style={true}
      >
        <BackgroundImageFirst backgrounds={content?.page?.backgroundImages}>
          <Header content={header} page={content?.page?.label} />
          <Banner banners={CONTACT_BANNER} page={content?.page} />
          <Description content={newDescription} />
          <TellButton buttons={arrButton} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <Container className="mt-5">
            <h2 className="m-0 mb-10 w-full rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-2xl font-normal uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)]">
              {messages['component.contact.address.title']}
            </h2>
            <Maps googleMapsUrl={googleMapsUrl} collections={collections} />
            <FormContact inputs={formDefault} />
          </Container>
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
