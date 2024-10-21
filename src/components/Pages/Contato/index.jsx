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

// Others
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getGoogleMaps } from '@/utils/functions'

export default function Contato({ content, locale }) {
  const [metaTitle, setMetaTitle] = useState(content?.page.metaTitle)
  const [metaDescription, setMetaDescription] = useState(
    content?.page.metaDescription,
  )
  const [title, setTitle] = useState(content?.page.title)
  const [description, setDescription] = useState(
    content?.page.contentDescription,
  )
  const [newDescription, setNewDescription] = useState(
    content?.page.components.description,
  )
  const [logoContact, setLogoContact] = useState(
    content?.page.components.logoContact,
  )
  const [arrButton, setArrButton] = useState(logoContact?.arrButton)
  const [formDefault, setFormDefault] = useState(
    content?.form?.forms.find((item) => item.label === 'default'),
  )

  useEffect(() => {
    // Atualiza os estados quando 'locale' muda ou quando 'content' muda
    if (content) {
      setMetaTitle(content.page.metaTitle || '')
      setMetaDescription(content.page.metaDescription || '')
      setTitle(content.page.title || '')
      setDescription(content.page.contentDescription || '')
      setNewDescription(content.page.components.description || '')

      const updatedLogoContact = content.page.components.logoContact || null
      setLogoContact(updatedLogoContact)

      if (updatedLogoContact) {
        setArrButton(updatedLogoContact.arrButton || [])
      }

      setFormDefault(
        content.form?.forms.find((item) => item.label === 'default') || null,
      )
    }
  }, [locale, content]) // Monitora as mudanças em 'locale' e 'content'

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
          <Banner banners={content?.page?.banners} page={content?.page} />
          <Description content={newDescription} />
          <TellButton buttons={arrButton} />
        </BackgroundImageFirst>
        <BackgroundImageLast backgrounds={content?.page?.backgroundImages}>
          <Container className="mt-5">
            <h2 className="m-0 mb-10 w-full rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-2xl font-normal uppercase text-white shadow-[inset_0px_5.26px_5.26px_rgba(0,0,0,0.25)]">
              {content?.page.components.address.title}
            </h2>
            <Maps
              googleMapsUrl={googleMapsUrl}
              collections={content?.page.components.address.addresses}
              contact
            />
            <FormContact inputs={formDefault} />
          </Container>
          <Footer content={footer} />
          <Copyright content={copyright} />
        </BackgroundImageLast>
      </Templates>
    </>
  )
}
