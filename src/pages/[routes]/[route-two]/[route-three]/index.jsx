import React from 'react'
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { formatStrToUrl } from '@/utils/functions';

import { getDataPage } from '@/service/model/routeThree'

// Pages
import Contato from '@/components/Pages/Contato'
import QuemSomos from '@/components/Pages/QuemSomos'
import Fabrica from '@/components/Pages/Fabrica'
import Distribuidoras from '@/components/Pages/Distribuidoras'
import Autopecas from '@/components/Pages/Autopecas'
import AutocenterEMecanicas from '@/components/Pages/Mecanicas'
import Parceiro from '@/components/Pages/Parceiro'
import Produtos from '@/components/Pages/Produtos'
import ProdutoGeo from '@/components/Pages/ProdutoGeo'
import Error from '@/components/Pages/Error'

export default function index({content}) {
  // const page = content.page.label;
  console.log(content);
  return (
    <>
    {content?.type === 'product-geo' && (
      <>
        <ProdutoGeo content={content}/>

      </>
      )}
 {(content?.type === 'distribuidoras' || content?.type === 'autopecas' || content?.type === 'mecanicas') && (
   <>
        <Parceiro content={content}/>
      </>
      )}

      {content?.type === 'error' && (
        <>
          <Error content={content}/>
   
        </>
        )}
      
    </>
  )
}





export const getServerSideProps  = async (context) => {
  try {
    const arrRoute = context.resolvedUrl.replace('/', '').split('/');
   
    const content = await getDataPage(arrRoute, context.locale);

    return {
      props: {
        content
      }
    };
  } catch (error) {
    console.error('Erro na página:', error);

    return {
      props: {
        content: null
      },
    };
  }
}
