import React from 'react'
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { formatStrToUrl } from '@/utils/functions';

// Pages
import Contato from '@/components/Pages/Contato'
import QuemSomos from '@/components/Pages/QuemSomos'
import Fabrica from '@/components/Pages/Fabrica'
import Distribuidoras from '@/components/Pages/Distribuidoras'
import Autopecas from '@/components/Pages/Autopecas'
import AutocenterEMecanicas from '@/components/Pages/Mecanicas'
import Parceiros from '@/components/Pages/Parceiros'
import Produtos from '@/components/Pages/Produtos'
import Produto from '@/components/Pages/Produto'
import Categoria from '@/components/Pages/Categoria'
import Error from '@/components/Pages/Error'

import { getDataPage } from '@/service/model/routeOne'

export default function index({content}) {
  console.log(content);
  const page = content?.page.label;
  return (
    <>
    {content?.type === 'page' && (
      <>
        {page === 'contato' && (<Contato content={content}/>)}
        {page === 'quem-somos' && (<QuemSomos content={content}/>)}
        {page === 'fabrica' && (<Fabrica content={content}/>)}
        {page === 'distribuidoras' && (<Distribuidoras content={content}/>)}
        {page === 'autopecas' && (<Autopecas content={content}/>)}
        {page === 'mecanicas' && (<AutocenterEMecanicas content={content}/>)}
        {page === 'parceiros' && (<Parceiros content={content}/>)}
        {page === 'Produtos' && (<Produtos content={content}/>)}
      </>
      )}
 {content?.type === 'category' && (
      <>
        <Categoria content={content}/>
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
    const resolvedUrl = context.resolvedUrl;
    const content = await getDataPage(resolvedUrl);

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
};