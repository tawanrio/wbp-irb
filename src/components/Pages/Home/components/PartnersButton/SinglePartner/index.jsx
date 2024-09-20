import Image from 'next/image'
import Link from 'next/link'

export const SinglePartner = ({ partner }) => {
  return (
    <li className="flex flex-col gap-5">
      <div className="rounded-3xl border border-solid border-[#FFFFFF4D] bg-[#D9D9D91A] p-4 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]">
        <Image
          src={partner.src}
          alt={partner.alt}
          width={200}
          quality={100}
          height={200}
          className="m-auto p-4 duration-500 group-hover:scale-105"
        />
        <div className="flex flex-col items-start justify-between gap-1 p-4">
          <p className="m-0 text-3xl font-extralight uppercase text-[#982225]">
            {partner.surtitle}
          </p>
          <h2 className="m-0 break-all text-3xl font-black uppercase text-[#982225]">
            {partner.title}
          </h2>
        </div>
      </div>
      <Link
        href={partner.link}
        className="mx-auto w-fit rounded-full bg-[#982225] px-5 py-1 text-center text-lg font-normal uppercase text-white shadow-[0px_3.02px_3.02px_rgba(0,0,0,0.25)] duration-200 hover:scale-95"
      >
        Saiba mais
      </Link>
    </li>
  )
}
