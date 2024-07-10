// SEO
import Head from 'next/head'

// Template / Layout
import Templates from '@/components/Templates'
import Banner from "@/components/Banner/index";


// Others
import { useState} from 'react';
import  {useRouter}  from 'next/router';
import { sortByKey } from '@/utils/functions';

// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import CompanyValues from './components/CompanyValues';
import ContentImgDescription from '@/components/ContentImgDescription';
import Products from '@/components/Products';
import Categories from '@/components/Categories';
import Faq from '@/components/Faq';
import Title from '@/components/Title';
import InsertVideo from '@/components/InsertVideo';
import Utilities from '@/components/Utilities';
import TimeLine from './components/TimeLine';
import TimeLineNew from './components/TimeLineNew';
import CarouselEvent from './components/CarouselEvents';
import CategoryGrid from '@/components/CategoryGrid';


export default function Fabrica({content}) {

  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(content?.page.banners)
  const [title] = useState(content?.page.title)
  const [description] = useState(content?.page.contentDescription)
  const [metaTitle] = useState(content?.page.metaTitle)
  const [video] = useState(content?.page?.video)
  const [cardsValues] = useState(content?.page?.companyValues)
  const [metaDescription] = useState(content?.page.metaDescription)
  const [imgDescription] = useState(content?.page.imgDescription)
  const [metaKeywords] = useState(content?.page?.metaKeywords)
  const [events] = useState(content?.page?.events)

  const sortedCategories = sortByKey(content.categories,'label')

  const bannerTeste = {
    "colors": {
        "bg": "#fff",
        "text": "#fff",
        "controllers": "#fff"
    },
    "size": {
        "height": 330
    },
    "carousel": [
        {
            "title": "CENTRO LOGÍSTICO IRB",
            "description": "",
            "url": "/video/sobre.mp4",
            "alt": "banner dois",
            "position": "start"
        }
    ]
}

  return (
    <>
    <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
       <meta name="keywords" content={metaKeywords || ''}/>
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
     </Head>
    <Templates template={content?.template} page={content?.page} menus={content?.menus}>
      <Banner banners={bannerTeste} stlyeText={true}/>
       <BreadCrumb/>
       <Title title={title} className={'mt-5'}/>
       <ContentDescription content={description}  className={'mt-5'}/>
       <TimeLineNew />
       <CompanyValues cards={cardsValues}/>
       <CategoryGrid categories={sortedCategories} title />
        {/* <InsertVideo content={video}/> */}
        {/* <Categories baseUrl={`/`} categories={content?.categories} colors={content?.page?.colors.products} title /> */}
       <CarouselEvent events={events}/>
       {/* <Products baseUrl={`${pageUrl}/`} products={content?.products} colors={content?.page?.colors.products} title/> */}
       {/* <Utilities title={'Utilidades'}/> */}
    </Templates>
          
   </>
  )
}
