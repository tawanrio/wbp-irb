import Image from 'next/image'
import RenderList from './components/RenderList'

import SocialMidia from './components/SocialMidia'

export default function Footer({ content }) {
  const dataFooter = content?.items.find((item) => item.label === 'default')
  const colors = dataFooter?.colors
  const certificates = dataFooter?.certificates

  return (
    <footer style={{ background: colors?.bg, color: colors?.text }}>
      <div className="mx-auto flex flex-col gap-1 px-6 py-6 md:max-w-7xl md:justify-between md:px-14 md:py-12 lg:flex-row">
        <ul className="flex flex-col sm:flex-row">
          <RenderList nav={dataFooter?.nav} colors={colors} />
        </ul>

        <div className="mx-auto flex flex-col items-center lg:mx-3 lg:w-max lg:flex-1 lg:items-start lg:last:mr-0">
          <ul className="list-ul flex flex-col items-center lg:items-start">
            <li className="text-center text-base font-light lg:text-start lg:text-lg">
              {dataFooter?.address}
            </li>
            <li className="mb-3 mt-4">
              <div className="flex">
                {certificates?.map((certificate, index) => (
                  <Image
                    src={certificate?.url}
                    alt={certificate?.alt}
                    width={180}
                    height={110}
                    className="w-1/2"
                    key={index}
                  />
                ))}
              </div>
            </li>
          </ul>

          <SocialMidia content={dataFooter?.socialMidia} />
        </div>
      </div>
    </footer>
  )
}
