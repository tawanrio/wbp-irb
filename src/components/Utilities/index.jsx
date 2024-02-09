import React from 'react'
import SectionTitle from '../SectionTitle'
import CardUtils from './CardUtils'
import CardUtilsTwo from './CardUtilsTwo'
import CardUtilsThree from './CardUtilsThree'
import CardUtilsFour from './CardUtilsFour'

export default function Utilities({title}) {
    const engraxamente = {
        title: 'EngraxaMente',
        description: 'EngraxaMente é a plataforma de cursos online e gratuitos desenvolvida pela IRB Automotive. Em comemoração aos seus dois anos no ar, lançamos um novo curso sobre Mecânica Automotiva Básica P1. Cresça profissionalmente, agregue valor ao seu negócio!',
        image: '/images/partners/engraxamente.jpeg',
        link: 'https://engraxamente.eadplataforma.app/',
        linkText: 'Saiba mais'
    }

    const irbCode = {
        title: 'IRB Code',
        description: 'IRB Code é uma ferramenta desenvolvida pela IRB Automotive que auxilia nossos amigos reparadores no correto diagnóstico de problemas no circuito ABS dos rolamentos.',
        image: '/images/partners/irbCode.jpeg',
        link: '/irbcode',
        linkText: 'Saiba mais'
    }

    const catalogo = {
        title: 'Catálogo eletrônico',
        description: 'Consulte nosso catálogo eletrônico e saiba todas as aplicações dos nossos produtos.',
        image: '/images/partners/catalogo.png',
        link: 'https://c123.com.br/app/aplicativo/?n=IRB',
        linkText: 'Baixar catálogo'
    }

    const ebook = {
        title: 'E-book',
        description: 'Na aba “Conteúdo” você vai encontrar eBooks disponíveis para download gratuitamente! Neles você irá conhecer um pouco mais sobre nossas linhas de produto e suas especificações, além de dicas técnicas!',
        image: '/images/partners/ebook.jpeg',
        link: 'https://irbauto.rds.land/material-rico',
        linkText: 'Baixar eBook!'
    }

  return (
    <section className="flex flex-col items-center " id={`partners_`}>
        <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6  flex flex-col justify-between md:gap-10">
        {title && <SectionTitle title={title} line/>}
        </div>
        <div className='
        md:my-2
        flex
        max-w-7xl
        md:px-14
        md:gap-8
        gap-5
        w-full
        justify-center
        flex-wrap
        my-10
        '>
            <CardUtilsFour content={engraxamente} blank='_blank'/>
            <CardUtilsFour content={irbCode}/>
            <CardUtilsFour content={catalogo} blank='_blank'/>
            <CardUtilsFour content={ebook} blank='_blank'/>

            {/* <CardUtilsTwo content={engraxamente}/>
            <CardUtilsTwo content={irbCode}/>
            <CardUtilsTwo content={catalogo}/>
            <CardUtilsTwo content={ebook}/> */}
            
        </div>
    </section>
  )
}
