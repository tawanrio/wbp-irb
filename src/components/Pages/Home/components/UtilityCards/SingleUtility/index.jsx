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
        "relative mx-auto flex h-[420px] flex-row items-center justify-center gap-5 rounded-3xl bg-background-mechanic-working bg-no-repeat font-nunito shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)] before:absolute before:z-[2] before:block before:h-full before:w-full before:rounded-3xl before:bg-[#3338579e] before:content-[''] max-lg:bg-cover lg:w-[700px]",
        nunito.variable,
      )}
    >
      <Image
        src={utility.image}
        alt={utility.title}
        width={297.33}
        height={455}
        className="z-[3] -mt-[34px] hidden rounded-t-md object-contain lg:block"
      />
      <div className="z-[3] flex h-full w-full flex-col justify-between px-7 py-8 lg:max-w-[337.84px] lg:items-end lg:px-0">
        <div className="flex flex-col gap-2 sm:gap-4">
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
          className="w-fit rounded-full bg-[#982225] px-5 py-1 text-center font-medium uppercase text-white transition-all duration-200 hover:scale-95"
        >
          {utility.linkText}
        </Link>
      </div>
    </div>
  )
}
