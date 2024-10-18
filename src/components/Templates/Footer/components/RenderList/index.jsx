import Image from 'next/image'
import { RenderListItem } from './RenderListItem'
import logo from '../../../../../../public/images/templates/header/logo-white.svg'

export default function RenderList({ nav, colors, certificates }) {
  const newNav = nav?.filter((item) => item?.links?.length > 0)

  return (
    <div className="flex flex-1 flex-col max-sm:gap-y-5">
      <ul className="flex flex-1 flex-col justify-between sm:flex-row">
        {newNav.map((items, ulId) => (
          <li
            key={ulId}
            className="mb-6 flex-1 font-light md:mx-3 md:flex-1 md:first:ml-0"
          >
            <ul className="flex flex-col gap-2">
              {items?.links?.map((li, index) => (
                <RenderListItem
                  key={index}
                  liId={index}
                  content={li}
                  colors={colors}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <figure className="flex w-full flex-col items-center justify-center gap-4 lg:w-[85%] lg:flex-row lg:justify-between">
        <figure className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
          {certificates?.map((certificate, index) => (
            <Image
              key={index}
              src={certificate?.url}
              alt={certificate?.alt}
              width={160}
              height={100.61}
              className="max-w-[160px]"
            />
          ))}
        </figure>

        <Image
          src={logo}
          alt="Logo IRB Automovite"
          width={156}
          height={141.24}
          className="w-[143.37px] lg:mr-24 lg:w-[156px]"
        />
      </figure>
    </div>
  )
}
