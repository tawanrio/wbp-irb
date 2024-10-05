import Link from 'next/link'
import Image from 'next/image'

export const Catalog = ({ content }) => {
  const { buttons, descriptions, imageProduct, title } = content

  return (
    <section className="mx-auto flex min-h-[35rem] w-full max-w-[1440px] flex-col items-center px-5 pb-14 pt-8 sm:py-20 md:flex-row">
      <figure className="relative w-full">
        <Image
          src={imageProduct.image}
          alt={imageProduct.alt}
          width={1080}
          height={1080}
          className="max-h-[800px] w-full max-w-[800px] object-cover"
        />
      </figure>
      <div className="flex w-full max-w-xl flex-col gap-8">
        <h2 className="text-3xl font-bold text-[#982225] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <ul className="space-y-1">
          {descriptions.map((description, index) => (
            <li key={index}>
              <p className="font-extralight sm:text-xl lg:text-2xl">
                {description}
              </p>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {buttons?.map((button, index) => (
            <li key={index}>
              <Link target="_blank" href={button.link} className="text-white">
                <Image
                  src={button.image}
                  alt={button.alt}
                  width={215}
                  height={65}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
