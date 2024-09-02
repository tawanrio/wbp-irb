import { useState } from 'react'
import Image from 'next/image'
import RenderList from './components/RenderList'
import SocialMidia from './components/SocialMidia'
import { ButtonWhatsapp } from '@/components/ButtonWhatsapp'

export default function Footer({ content }) {
  const [whatsapp, setWhatsapp] = useState(null)

  const dataFooter = content?.items.find((item) => item.label === 'default')
  const colors = dataFooter?.colors
  const certificates = dataFooter?.certificates

  return (
    <footer style={{ background: colors?.bg, color: colors?.text }}>
      <div className="relative mx-auto flex flex-col gap-1 px-5 py-6 md:max-w-7xl md:justify-between md:px-14 md:py-12 lg:flex-row">
        <RenderList nav={dataFooter?.nav} colors={colors} />

        <div className="mx-auto flex w-full max-w-80 flex-col items-center gap-6 lg:mx-3 lg:flex-1 lg:items-start lg:last:mr-0">
          <ul className="list-ul flex flex-col items-center gap-5 lg:items-start">
            <li className="text-center font-normal lg:text-start lg:text-lg">
              {dataFooter?.address}
            </li>
            <li>
              {certificates?.map((certificate, index) => (
                <Image
                  key={index}
                  src={certificate?.url}
                  alt={certificate?.alt}
                  width={253.99}
                  height={120.61}
                  className="w-[253.99px]"
                />
              ))}
            </li>
          </ul>

          <SocialMidia
            content={dataFooter?.socialMidia}
            setWhatsapp={setWhatsapp}
          />
        </div>
        <ButtonWhatsapp whatsapp={whatsapp} />
      </div>
    </footer>
  )
}
