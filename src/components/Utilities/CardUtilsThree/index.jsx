import Image from 'next/image'
import Link from 'next/link'

export default function CardUtilsTwo() {
  return (
    <div className="flex min-h-[250px] min-w-[40%] flex-1 flex-col items-center justify-center gap-4 rounded-3xl duration-500 md:min-w-[45%]">
      <h2 className="text-xl font-bold text-[#666]">
        Cursos IRB Engraxamente (EAD)
      </h2>

      <div className="group relative flex min-w-[100%] flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl py-10 grayscale-[50%] duration-500 before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-[#0a0a0aa3] before:content-[''] hover:grayscale-[100%] md:!min-h-[180px]">
        <Image
          fill
          sizes="100vw"
          src={'/images/partners/engraxamente.jpeg'}
          alt={'sda'}
          className="object-cover duration-700"
        />
      </div>
      <div className="z-50 flex flex-col items-center gap-4 px-4 text-center text-[#666]">
        <span className="line-clamp-3 text-justify">
          EngraxaMente é a plataforma de cursos online e gratuitos desenvolvida
          pela IRB Automotive. Em comemoração aos seus dois anos no ar, lançamos
          um novo curso sobre Mecânica Automotiva Básica P1. Cresça
          profissionalmente, agregue valor ao seu negócio! Seja especialista com
          a gente, plante uma semente, EngraxaMente!
        </span>
        <Link
          href={''}
          className="hover:bg-[rgb(193, 32, 37)] w-1/2 cursor-pointer rounded-3xl border border-[#666] py-2 duration-500 hover:scale-105"
        >
          Saiba mais
        </Link>
      </div>
    </div>
  )
}
