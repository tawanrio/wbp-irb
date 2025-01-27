import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { useIntl } from 'react-intl'

export const Product = ({ product, className }) => {
  // const [htmlContent, setHtmlContent] = useState('')
  console.log(product)

  const {
    thumbnail,
    code,
    dimensions,
    vehicles,
    originalCode,
    referenceNumber,
    label,
  } = product

  const intl = useIntl()
  const messages = intl.messages

  // useEffect(() => {
  //   setHtmlContent(contentDescription)
  // }, [contentDescription])

  // return <></>
  return (
    <div
      suppressHydrationWarning
      className={cn(
        'flex w-full flex-col items-start justify-start overflow-hidden rounded-3xl border border-solid border-[#0000004D] bg-[#D9D9D91A] px-7 pb-7 pt-3',
        className,
      )}
    >
      <figure className="h-full max-h-[395.9px] w-full">
        <Image
          src={thumbnail.url || ''}
          alt={thumbnail.alt || ''}
          width={361.2}
          height={395.9}
          className="h-full max-h-[395.9px] w-full rounded-3xl"
        />
      </figure>
      <section className="flex w-full flex-col items-start justify-between px-2 pt-6">
        <h3 className="mb-1.5 line-clamp-2 text-2xl font-extrabold max-sm:break-all xl:text-4xl">
          {code?.toUpperCase()}
        </h3>
        {/* <p
          className="line-clamp-4 font-thin xl:text-lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        /> */}
        <p className="line-clamp-4 font-thin xl:text-lg">
          <b className="font-bold">Medidas: </b>
          {dimensions}
        </p>
        {/* <p className="line-clamp-4 font-thin xl:text-lg">
          <b className="font-bold">Código Original: </b>
          {originalCode.map((codes, index) => (
            <>
              {codes}
              {index !== originalCode.length - 1 && ' - '}
            </>
          ))}
        </p> */}
        <p className="line-clamp-4 font-thin xl:text-lg">
          <b className="font-bold">Código Original: </b>
          {originalCode[0]}
          {originalCode.length > 1 && '...'}
        </p>
        <p className="line-clamp-4 font-thin xl:text-lg">
          <b className="font-bold">Número Referência: </b>
          {referenceNumber[0]?.toUpperCase()}
          {referenceNumber.length > 1 && '...'}
        </p>
        <p className="line-clamp-4 font-thin xl:text-lg">
          <b className="font-bold">Montadora: </b>
          {vehicles[0]?.manufacturer.toUpperCase()}
          {vehicles.length > 1 && '...'}
        </p>

        {/* <p className="line-clamp-4 font-thin xl:text-lg">{dimensions}</p> */}
        <div className="mt-8 flex w-full justify-end">
          <Link
            href={`/${label}`}
            className="m-0 rounded-full bg-[#982225] px-5 py-1.5 font-thin !text-white transition-all duration-200 hover:scale-95"
          >
            {messages['component.home.product.seemore']}
          </Link>
        </div>
      </section>
    </div>
  )
}
