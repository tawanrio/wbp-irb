import Image from 'next/image'
import Link from 'next/link'

export const Utility = ({ utility }) => {
  return (
    <div
      className="relative flex h-[420px] flex-row items-center justify-center gap-5 rounded-3xl bg-cover bg-no-repeat font-sans shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)] before:absolute before:z-[2] before:block before:h-full before:w-full before:rounded-3xl before:bg-[#213271] before:opacity-80 before:content-[''] max-lg:bg-cover lg:w-[700px]"
      style={{ backgroundImage: utility.bgImage }}
    >
      <Image
        src={utility.image.src}
        alt={utility.title.name}
        width={utility.image.width}
        height={utility.image.height}
        className="z-[3] hidden rounded-t-md object-contain lg:block"
        style={{ marginTop: utility.image.margin }}
      />
      <div className="z-[3] flex h-full w-full flex-col justify-between px-7 py-8 lg:max-w-[337.84px] lg:items-end lg:px-0">
        <div
          className="flex flex-col gap-2 sm:gap-4"
          style={{ alignItems: utility.description.align }}
        >
          <h2
            className="text-white"
            style={{
              fontWeight: utility.title.weight,
              fontSize: utility.title.size,
              color: utility.title.color,
              textTransform: utility.title.transform,
              backgroundColor: utility.title.background,
              borderRadius: utility.title.rounded,
              padding: utility.title.padding,
              width: utility.title.width,
            }}
          >
            {utility.title.name}
          </h2>
          {utility?.surtitle && (
            <span
              className="text-white"
              style={{
                fontWeight: utility.surtitle.weight,
                fontSize: utility.surtitle.size,
                textAlign: utility.description.align,
              }}
            >
              {utility.surtitle.name}
            </span>
          )}
          <p
            className="m-0 text-white"
            style={{
              fontWeight: utility.description.weight,
              fontSize: utility.description.size,
              textAlign: utility.description.align,
              textWrap: utility.description.wrap,
            }}
          >
            {utility.description.name}
          </p>
        </div>
        <Link
          href={utility.link}
          target="_blank"
          rel="noopener"
          className="w-fit rounded-full bg-[#982225] px-5 py-1 text-center font-medium uppercase text-white transition-all duration-200 hover:scale-95"
        >
          {utility.linkText}
        </Link>
      </div>
    </div>
  )
}
