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

export default function BaixeNossoApp({ content }) {
  const [metaTitle] = useState(content?.page.metaTitle)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)

  const catalogDescription = {
    imageProduct: {
      imageUrl: '/images/partners/bannerIRB.png',
      alt: 'catalogo online',
    },
    title:
      'Baixe agora mesmo o catálogo eletrônico e consulte facilmente toda nossa linha de produtos.',
    subtitle: 'Acesse pelo celular',
    button: [
      {
        title: '',
        alt: 'appstore',
        image: '/images/products/appstore.png',
        link: 'https://apps.apple.com/br/app/irb-cat%C3%A1logo/id1169028455',
      },
      {
        title: '',
        alt: 'google-play',
        image: '/images/products/google-play.png',
        link: 'https://play.google.com/store/apps/details?id=br.com.ideia2001.CatalogoIRB',
      },
    ],

    description: [
      'Baixe agora nosso catálogo online e tenha acesso a uma ampla seleção de produtos automotivos de alta qualidade.',
      'Explore nossa vasta gama de peças e componentes para atender às necessidades do seu veículo.',
      'Baixe nosso catálogo hoje mesmo e descubra as melhores soluções para a manutenção e reparo do seu veículo!',
    ],
  }

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
      >
        <Banner banners={banners} />
        <BreadCrumb />
        <ImgCatalogDescription
          className={'mt-10'}
          content={catalogDescription}
        />
      </Templates>
    </>
  )
}
