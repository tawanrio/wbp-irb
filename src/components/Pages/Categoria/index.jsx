/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Template
import Head from 'next/head'
import Templates from '@/components/Templates'

// Components
import ContentDescription from '@/components/ContentDescription'
import Title from '@/components/Title'
import Banner from '@/components/Banner/index'
import BreadCrumb from '@/components/BreadCrumb'
import ProductModels from '@/components/Products/ProductModels'
import Faq from '@/components/Faq'
import Filter from '@/components/Filter'
import FindPartners from '@/components/FindPartners'
import Partners from '@/components/Partners'
import Utilities from '@/components/Utilities'
import Categories from '@/components/Categories'
import ImgCatalogDescription from '@/components/ImgCatalogDescription'
import SearchProducts from '@/components/SearchProducts'

// Database // Schema
import { Categories as SchemaCategories } from '@/service/model/schemas/categoriesSchema'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import Page from '@/service/model/schemas/pageSchema'
import { Menu } from '@/service/model/schemas/menuSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'

// Others
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProductFromUrl, insertMenuInTemplate } from '@/utils/functions'
import Ebooks from './components/Ebooks'
import ContentImgDescription from '@/components/ContentImgDescription'
import ContentImgHTMLDesc from './components/ContentImgHTMLDesc'
import PartnersButton from '../Home/components/PartnersButton'
import UtilityCards from '../Home/components/UtilityCards'

export default function Categoria({ content }) {
  const route = useRouter()
  let pageUrl = route.asPath.split('/')
  pageUrl = pageUrl[pageUrl.length - 1]

  const [category, setCategory] = useState(content?.category)

  useEffect(() => {
    setCategory(content.category)
  }, [pageUrl])

  console.log(content)
  //  console.log(content);

  const catalogDescription = {
    imageProduct: {
      imageUrl: '/images/partners/bannerIRB.png',
      alt: 'catalogo online',
    },
    title:
      'Baixe agora mesmo o catálogo eletrônico e consulte facilmente toda nossa linha de produtos.',
    subtitle: 'Acesse pelo computador ou celular',
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
      'Tenha acesso a nossa ampla gama de peças automotivas de alta qualidade para atender as necessidades do seu veículo.',
      'Encontre tudo o que você precisa para manter o seu carro funcionando perfeitamente: rolamentos de roda, cubos de roda, trizetas, radiadores, intercoolers e eletroventiladores.',
      'Baixe nosso catálogo hoje mesmo e descubra as melhores soluções para a manutenção e reparo do seu veículo!',
    ],
  }

  const ImgDescription = {
    title: 'Compromisso com a Qualidade',
    description: '<span><h3>teste</h3><p>aqui vai qualquer coisa </p></span>',
    image: {
      borderRadius: '20%',
      url: '/images/partners/irb-selo.jpeg',
      title: '',
      alt: 'Imagem do produto',
    },
  }

  return (
    <>
      <Head>
        <title>{category?.metaTitle || category?.title}</title>
        <meta
          name="description"
          content={category?.metaDescription || category?.contentDescription}
        />
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
        <Banner banners={content?.category?.banners} />
        <BreadCrumb />
        <Title title={category?.title} />
        {/* <ContentDescription content={category?.contentDescription}/> */}
        <ContentImgHTMLDesc
          textHTML={category.description}
          image={category.thumbnail}
        />
        <ImgCatalogDescription content={catalogDescription} />
        {content.category.ebook && <Ebooks ebooks={content.category.ebook} />}
        {/* <ProductModels products={product?.models} cards={product?.models} baseUrl={`/${pageUrl}/`} title={'Título h2 - Modelos Produtos'}/> */}

        {/* <SearchProducts  title="Encontre seu produto" hiddenProductSearch  products={content?.products} /> */}

        {/* <Filter select={product?.models}  title={'Modelos de Produtos'}/> */}
        {/* <FindPartners partners={content?.partners} /> */}
        <PartnersButton partners={content?.partners?.types} />

        <UtilityCards />
        {/* <FindPartners title={content?.partners?.title} product={category} partners={content?.partners?.types}  colors={content?.partners?.colors} hiddenTitle /> */}
        {/* <Utilities title={'Utilidades'}/> */}
      </Templates>
    </>
  )
}
