import { useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';

export default function Ebooks({ebooks}) {

    const [translateX, setTranslateX] = useState(0);

    const moveCarousel = (direction) => {
        const cardWidth = 50; // Largura do card em porcentagem
        const carouselWidth = ebooks.length * cardWidth;
        const step = 100; // Quantidade de movimento a cada clique

        if (direction === 'prev') {
            setTranslateX((prevTranslateX) => Math.min(prevTranslateX + step, 0));
        } else if (direction === 'next') {
            const maxTranslate = -(carouselWidth - 100); // Para evitar que o carousel vá além do último card
            setTranslateX((prevTranslateX) => Math.max(prevTranslateX - step, maxTranslate));
        }
    };

    return (
        <section className="flex flex-col items-center" id={`partners_`}>
            <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6 flex flex-col justify-between md:gap-10">
                <SectionTitle title={'Baixe nosso eBook'} line/>
                <div className="relative ">
                    <div className="flex flex-wrap justify-start" style={{ transform: `translateX(${translateX}%)` }}>
                        {ebooks.map((ebook, index) => (
                            <div id='card' key={index} className="flex flex-col items-center w-96 p-4">
                                <img src={ebook.img} alt={ebook.title} className="h-72 mb-4" />
                                <h2 className="text-xl font-semibold h-14 mb-2">{ebook.title}</h2>
                                <Link href={ebook.link} target='_blank' className="px-4 py-2 bg-[#22326e] text-white rounded">
                                    Baixar eBook
                                </Link>
                            </div>
                        ))}
                    </div>
                    {/* <button onClick={() => moveCarousel('prev')} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-700 text-white rounded">Prev</button>
                    <button onClick={() => moveCarousel('next')} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-700 text-white rounded">Next</button> */}
                </div>
            </div>
        </section>
    );
}
