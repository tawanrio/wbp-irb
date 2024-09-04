import Image from 'next/image'
import Link from 'next/link'

const SingleUtility = ({ utilities }) => {
  return (
    <div className="bg-background-mechanic-working flex h-[420px] flex-row items-center justify-center gap-5 rounded-3xl shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)] before:absolute before:z-[2] before:block before:h-full before:w-[700px] before:rounded-3xl before:bg-[#3338579e] before:content-['']">
      <Image
        src={utilities.image}
        alt={utilities.title}
        width={297.33}
        height={455}
        className="z-[3] -mt-[34px] rounded-t-md object-contain"
      />
      <div className="z-[3] flex h-full w-full max-w-[337.84px] flex-col items-end justify-between pb-14 pt-20">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-extrabold text-white">
            {utilities.title}
          </h2>
          <span className="text-sm font-light text-white">
            {utilities.surtitle}
          </span>
          <p className="m-0 text-lg font-extrabold text-white">
            {utilities.description}
          </p>
        </div>
        <Link
          href={utilities.link}
          className="rounded-full bg-[#982225] px-5 py-1 text-center font-medium uppercase text-white transition-all duration-200 hover:scale-95"
        >
          Baixe Agora
        </Link>
      </div>
    </div>
  )
}

export default SingleUtility
