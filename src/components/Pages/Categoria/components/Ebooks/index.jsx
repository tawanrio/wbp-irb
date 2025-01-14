/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'

export default function Ebooks({ ebooks }) {
  return (
    ebooks.length > 0 && (
      <section
        id="partners_"
        className="mx-auto flex w-full max-w-7xl flex-col px-6 md:gap-10 md:px-14 md:py-7"
      >
        <SectionTitle title="Baixe nosso eBook" line />
        <div className="relative">
          <div className="flex flex-wrap justify-start">
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
                  rel="noopener"
                  className="rounded bg-[#22326e] px-4 py-2 text-white"
                >
                  Baixar eBook
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  )
}
