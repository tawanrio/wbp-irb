import { useState } from 'react'
import Image from 'next/image'
import RenderList from './components/RenderList'
import SocialMidia from './components/SocialMidia'
import { ButtonWhatsapp } from '@/components/ButtonWhatsapp'

export default function Footer({ content }) {
  const [whatsapp, setWhatsapp] = useState(null)
  const dataFooter = content?.items.find((item) => item.label === 'default')
  const { colors, nav, address, certificates, socialMidia } = dataFooter

  return (
    <footer style={{ background: colors?.bg, color: colors?.text }}>
      <div className="relative mx-auto flex flex-col gap-1 px-5 py-6 md:max-w-[1600px] md:justify-between md:px-14 md:py-12 lg:flex-row">
        <RenderList nav={nav} colors={colors} />

        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 lg:mx-3 lg:flex-1 lg:items-start lg:last:mr-0">
          <div className="flex flex-col items-center gap-5 lg:items-start">
            <address className="text-center font-normal not-italic lg:text-start lg:text-lg">
              {address}
            </address>
            <figure className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
              {certificates?.map((certificate, index) => (
                <Image
                  key={index}
                  src={certificate?.url}
                  alt={certificate?.alt}
                  width={200}
                  height={100.61}
                  className="w-[200px]"
                />
              ))}
            </figure>
          </div>

          <SocialMidia content={socialMidia} setWhatsapp={setWhatsapp} />
        </div>
        <ButtonWhatsapp whatsapp={whatsapp} />
      </div>
    </footer>
  )
}
