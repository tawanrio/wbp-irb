/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Link from 'next/link'

export default function CardUtils({ content }) {
  return (
    <div className="relative flex min-h-[250px] min-w-[40%] flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl duration-500 md:min-w-[45%]">
      <h2 className="text-xl font-bold text-[#666]">
        Cursos IRB Engraxamente (EAD)
      </h2>
      <div className="group relative flex min-w-[90%] flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl py-10 grayscale-[50%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0ad8] before:content-[''] hover:grayscale-[100%]">
        <Image
          fill
          sizes="100vw"
          src={'/images/partners/engraxamente.jpeg'}
          alt={'sda'}
          className="h-[100%] object-cover"
        />
        <div className="z-50 flex flex-col items-center gap-4 px-10 text-center text-white">
          <span className="line-clamp-3 text-justify">
            EngraxaMente é a plataforma de cursos online e gratuitos
            desenvolvida pela IRB Automotive. Em comemoração aos seus dois anos
            no ar, lançamos um novo curso sobre Mecânica Automotiva Básica P1.
            Cresça profissionalmente, agregue valor ao seu negócio! Seja
            especialista com a gente, plante uma semente, EngraxaMente!
          </span>
          <Link
            href={''}
            className="hover:bg-[rgb(193, 32, 37)] w-1/2 cursor-pointer rounded-3xl border border-white py-2 duration-500 hover:scale-105"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  )
}
