import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';

export default function Templates({page}) {
    const { dataRota } = useContext(PageData);
   
  return (
    <div>{page}</div>
  )
}