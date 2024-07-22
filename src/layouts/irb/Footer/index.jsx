import Image from 'next/image'
import RenderList from './components/RenderList'

import { useContext } from 'react'
import { PageData } from '@/context/pageData'

import SocialMidia from './components/SocialMidia'

export default function Footer() {
  const { layouts } = useContext(PageData)
  const dataFooter = layouts.footer
  const colors = layouts.footer.colors

  return (
    <footer style={{ background: colors.bg, color: colors.text }}>
      <div className="mx-auto flex flex-wrap gap-1 px-6 py-6 md:max-w-7xl md:justify-between md:px-14 md:py-12">
        <RenderList list={dataFooter.lists} />

        <div className="flex flex-col items-center md:mx-3 md:w-max md:flex-1 md:items-start md:last:mr-0">
          <ul className="list-ul flex flex-col items-center md:items-start">
            <li className="text-center text-base font-light md:text-start md:text-lg">
              {dataFooter.address}
            </li>
            <li className="mb-3 mt-4">
              <Image
                src="/images/footer/certificado-iso.svg"
                alt="logo"
                width={180}
                height={110}
              />
            </li>
          </ul>

          <SocialMidia />
        </div>
      </div>
    </footer>
  )
}
