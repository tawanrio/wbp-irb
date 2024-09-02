import Image from 'next/image'
import { RenderListItem } from './RenderListItem'
import logo from '../../../../../../public/caminho/da/imagem.png'

export default function RenderList({ nav, colors }) {
  return (
    <div className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col justify-between sm:flex-row">
        {nav?.map((items, ulId) => (
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

      <figure className="flex w-full justify-center lg:w-[80%] lg:justify-end">
        <Image
          src={logo}
          alt="Logo IRB Automovite"
          width={163.37}
          height={168.84}
        />
      </figure>
    </div>
  )
}
