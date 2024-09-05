import Image from 'next/image'
import Link from 'next/link'
import { Nunito } from 'next/font/google'
import { cn } from '@/utils/cn'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const SingleUtility = ({ utility }) => {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[420px] w-[700px] flex-row items-center justify-center gap-5 rounded-3xl bg-background-mechanic-working font-nunito shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)] before:absolute before:z-[2] before:block before:h-full before:w-full before:rounded-3xl before:bg-[#3338579e] before:content-['']",
        nunito.variable,
      )}
    >
      <Image
        src={utility.image}
        alt={utility.title}
        width={297.33}
        height={455}
        className="z-[3] -mt-[34px] rounded-t-md object-contain"
      />
      <div className="z-[3] flex h-full w-full max-w-[337.84px] flex-col items-end justify-between pb-14 pt-20">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-extrabold text-white">
            {utility.title}
          </h3>
          <span className="text-sm font-light text-white">
            {utility.surtitle}
          </span>
          <p className="m-0 text-xl font-extrabold text-white">
            {utility.description}
          </p>
        </div>
        <Link
          href={utility.link}
          target="_blank"
          className="rounded-full bg-[#982225] px-5 py-1 text-center font-medium uppercase text-white transition-all duration-200 hover:scale-95"
        >
          Baixe Agora
        </Link>
      </div>
    </div>
  )
}
