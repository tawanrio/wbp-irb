import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import SingleUtility from './SingleUtility';

const UtilityCards = ({ title }) => {
  const partnerTypes = [
    {
      title: 'EngraxaMente',
      description: 'EngraxaMente é a plataforma de cursos online e gratuitos desenvolvida pela IRB Automotive. Em comemoração aos seus dois anos no ar, lançamos um novo curso sobre Mecânica Automotiva Básica P1. Cresça profissionalmente e agregue valor ao seu negócio!',
      image: '/images/partners/engraxamente.jpeg',
      link: 'https://engraxamente.eadplataforma.app/',
      linkText: 'Saiba mais'
    },
    {
      title: 'IRB Code',
      description: 'IRB Code é uma ferramenta desenvolvida pela IRB Automotive, que auxilia nossos amigos reparadores no correto diagnóstico de problemas no circuito ABS dos rolamentos.',
      image: '/images/partners/irbCode.jpeg',
      link: '/autopecas',
      linkText: 'Onde encontrar'
    },
    {
      title: 'Catálogo eletrônico',
      description: 'Consulte nosso catálogo eletrônico e saiba todas as aplicações dos nossos produtos.',
      image: '/images/partners/catalogo.png',
      link: 'https://c123.com.br/app/aplicativo/?n=IRB',
      linkText: 'Baixar catálogo'
    },
    {
      title: 'eBooks',
      description: 'Na aba “Conteúdo” você vai encontrar eBooks disponíveis para download gratuitamente! Neles você irá conhecer um pouco mais sobre nossas linhas de produto e suas especificações, além de dicas técnicas!',
      image: '/images/partners/ebook.jpeg',
      link: 'https://irbauto.rds.land/material-rico',
      linkText: 'Baixar eBook!'
    }
    // Mais cartões...
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (partnerTypes.length -1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0) {
        return partnerTypes.length - 2; // Voltar para o último card ao chegar ao início
      }
      return newIndex;
    });
  };

  return (
    <section className="relative flex flex-col items-center mt-14" id="blog-carousel">
      <div className="w-full relative md:max-w-7xl flex-col md:px-14 md:mb-10 my-4 px-6 flex max-w-lg">
        <SectionTitle title={'Utilidades'} line />
        <div className="container mx-auto py-10 my-5">
          <div className="relative flex overflow-hidden">
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 bg-[#22326e] font-semibold text-white text-center hover:bg-[#22326e] duration-500 hover:opacity-100 hover:border-white hover:text-white px-4 py-2 opacity-70 transform -translate-y-1/2 top-1/2"
            >
              {'<'}
            </button>
            <div
              className="flex transition-transform duration-500 gap-5"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? '14.4' : '50')}%)`,
              }}
            >
              {partnerTypes.map((utilities, index) => (
                <div
                  key={index}
                  className="md:w-[48%] w-[80vw] flex-shrink-0 hover:scale-95 duration-500 rounded-md overflow-hidden"
                  style={{ marginRight: '8px' }} // Assuming gap is 8px
                >
                  <SingleUtility utilities={utilities} />
                </div>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 bg-[#22326e] font-semibold text-white text-center hover:bg-[#22326e] duration-500 hover:opacity-100 hover:border-white hover:text-white px-4 py-2 opacity-70 transform -translate-y-1/2 top-1/2"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UtilityCards;
