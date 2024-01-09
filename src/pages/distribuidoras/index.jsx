// SEO
import Head from 'next/head'

// Template / Layout
import Header from '@/components/Templates/Header'
import Footer from '@/components/Templates/Footer'
import Copyright from '@/components/Templates/Copyright'
import Banner from "@/components/Banner";
import Title from '@/components/Title';

// Components
import ContentDescription from '@/components/ContentDescription';
import BreadCrumb from '@/components/BreadCrumb';
import ContentImgDescription from '@/components/ContentImgDescription';
import ProductFaq from '@/components/ProductFaq';

// Others
import { useContext, useState} from 'react';
import { PageData } from '@/context/pageData';
import  {useRouter}  from 'next/router';

export default function Distribuidoras({}) {
  const { _distributors, products } = useContext(PageData);

  const router = useRouter()
  const pageUrl = router.asPath.replace('/','')
  const [banners] = useState(_distributors.banners)
  const [title] = useState(_distributors.title)
  const [metaTitle] = useState(_distributors.metaTitle)
  const [metaDescription] = useState(_distributors.metaDescription)
  const [description] = useState(_distributors.contentDescription)
  const [imgDescription] = useState(_distributors.imgDescription)
  const [faq] = useState(_distributors.faq)

   
  return (
    <>
    <Head>
       <title>{metaTitle || title}</title>
       <meta name="description" content={metaDescription || description} />
     </Head>
   <Header/>
   <main>
       <Banner banners={banners}/>
       <BreadCrumb/>
       <Title title={title}/>
       <ContentDescription content={description}/>
       <ContentImgDescription content={imgDescription}/>
       <ProductFaq products={products} faq={faq} baseUrl={`/${pageUrl}/`}/>
       
   </main>
   <Footer/>
   <Copyright/>
   </>
  )
}
