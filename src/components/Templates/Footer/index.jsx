import { useState } from 'react'
import Image from 'next/image'
import RenderList from './components/RenderList'
import SocialMidia from './components/SocialMidia'
import { ButtonWhatsapp } from '@/components/ButtonWhatsapp'
import { cn } from '@/utils/cn'

export default function Footer({ content }) {
  const [whatsapp, setWhatsapp] = useState(null)
  const dataFooter = content?.items.find((item) => item.label === 'default')
  const { colors, nav, addressHome, certificates, socialMidia, countries } =
    dataFooter

  return (
    <footer
      className="px-5 md:px-14"
      style={{ background: colors?.bg, color: colors?.text }}
    >
      <div
        className={cn(
          'relative mx-auto flex flex-col gap-1 gap-y-7 py-6 md:max-w-7xl md:justify-between md:py-12 lg:flex-row',
        )}
      >
        <RenderList nav={nav} colors={colors} certificates={certificates} />

        <div className="mx-auto flex w-full max-w-[15rem] flex-col items-center gap-6 lg:mx-3 lg:flex-1 lg:items-start lg:last:mr-0">
          <div className="flex flex-col items-center gap-7 lg:items-start lg:gap-5">
            <address className="mt-2.5 font-bold uppercase not-italic">
              {addressHome}
            </address>
            <figure className="flex w-full flex-row items-center justify-center gap-1">
              {countries?.map((country, index) => (
                <Image
                  key={index}
                  src={country?.url}
                  alt={country?.name}
                  width={113.57}
                  height={72.84}
                  className="w-[113.57px]"
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
