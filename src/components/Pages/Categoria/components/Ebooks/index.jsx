/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'

export default function Ebooks({ ebooks }) {
  const [translateX, setTranslateX] = useState(0)

  const moveCarousel = (direction) => {
    const cardWidth = 50 // Largura do card em porcentagem
    const carouselWidth = ebooks.length * cardWidth
    const step = 100 // Quantidade de movimento a cada clique

    if (direction === 'prev') {
      setTranslateX((prevTranslateX) => Math.min(prevTranslateX + step, 0))
    } else if (direction === 'next') {
      const maxTranslate = -(carouselWidth - 100) // Para evitar que o carousel vá além do último card
      setTranslateX((prevTranslateX) =>
        Math.max(prevTranslateX - step, maxTranslate),
      )
    }
  }

  return (
    <section className="flex flex-col items-center" id={`partners_`}>
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14">
        <SectionTitle title={'Baixe nosso eBook'} line />
        <div className="relative">
          <div
            className="flex flex-wrap justify-start"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {ebooks.map((ebook, index) => (
              <div
                id="card"
                key={index}
                className="flex w-96 flex-col items-center p-4"
              >
                <img src={ebook.img} alt={ebook.title} className="mb-4 h-72" />
                <h2 className="mb-2 h-14 text-xl font-semibold">
                  {ebook.title}
                </h2>
                <Link
                  href={ebook.link}
                  target="_blank"
                  className="rounded bg-[#22326e] px-4 py-2 text-white"
                >
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
  )
}
