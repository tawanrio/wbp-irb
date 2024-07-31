/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import { formatString } from '@/utils/functions'

import { getDataPage } from '@/service/model/routeTwo'

// Pages
import Contato from '@/components/Pages/Contato'
import QuemSomos from '@/components/Pages/QuemSomos'
import FabricaOne from '@/components/Pages/FabricaOne'
import DistribuidorasOne from '@/components/Pages/DistribuidorasOne'
import AutopecasOne from '@/components/Pages/AutopecasOne'
import MecanicasOne from '@/components/Pages/MecanicasOne'
import Parceiro from '@/components/Pages/Parceiro'
import Produtos from '@/components/Pages/Produtos'
import Produto from '@/components/Pages/Produto'
import PartnerProduct from '@/components/Pages/PartnerProduct'
import Error from '@/components/Pages/Error'

// Schema
import Page from '@/service/model/schemas/pageSchema'
import { Products as ProductsDb } from '@/service/model/schemas/productsSchema'
import { Address } from '@/service/model/schemas/addressSchema'
import { Menu } from '@/service/model/schemas/menuSchema'
import { Template } from '@/service/model/schemas/templateSchema'
import { Categories } from '@/service/model/schemas/categoriesSchema'
import { Collection } from '@/service/model/schemas/collectionsSchema'

export default function Index({ content }) {
  // const page = content.page.label;
  // ;

  return (
    <>
      {content?.type === 'product' && (
        <>
          {/* <Produto content={content}/> */}
          <PartnerProduct content={content} />
        </>
      )}
      {(content?.type === 'distribuidoras' ||
        content?.type === 'autopecas' ||
        content?.type === 'mecanicas' ||
        content?.type === 'fabrica') && (
        <>
          <Parceiro content={content} />
        </>
      )}

      {content?.type === 'geo-fabrica' && <FabricaOne content={content} />}
      {content?.type === 'geo-distribuidoras' && (
        <DistribuidorasOne content={content} />
      )}
      {content?.type === 'geo-autopecas' && <AutopecasOne content={content} />}
      {content?.type === 'geo-mecanicas' && <MecanicasOne content={content} />}

      {content?.type === 'singleProduct' && (
        <>
          <Produto content={content} />
        </>
      )}

      {content?.type === 'error' && (
        <>
          <Error content={content} />
        </>
      )}
    </>
  )
}

// export default function Index({content,arrRoute}) {
//   ;
//   console.log(arrRoute);
//   return (
//     <>
//     teste
//     </>
//   )
// }

// export async function getStaticPaths() {
//   // Busque os caminhos possíveis para pré-renderizar
//   // Por exemplo, de um banco de dados ou API

//   return {
//     paths: [],
//     fallback: false, // ou true ou 'blocking' se necessário
//   };
// }

// export async function getStaticProps({ params }) {
// // export const getStaticProps  = async (context) => {
// // export const getServerSideProps  = async (context) => {

//   // const resolvedUrl = context.resolvedUrl;
//   try {

//   const resolvedUrl = Object.values(params);

//   const content = await getDataPage(resolvedUrl);

//   return {
//     props: {
//       content,
//       resolvedUrl
//     },
//     revalidate: 3600,
//   };
// } catch (error) {
//   console.error('Erro na página:', error);

//   return {
//     props: {
//       content: null,
//       resolvedUrl
//     },
//   };
// }

// };

export const getServerSideProps = async (context) => {
  try {
    const arrRoute = context.resolvedUrl.replace('/', '').split('/')

    const content = await getDataPage(arrRoute, context.locale)

    return {
      props: {
        arrRoute,
        content,
      },
    }
  } catch (error) {
    console.error('Erro na página:', error)

    return {
      props: {
        content: null,
      },
    }
  }
}
