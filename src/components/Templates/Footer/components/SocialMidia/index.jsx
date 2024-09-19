import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SocialMidia({ content, setWhatsapp }) {
  useEffect(() => {
    const whatsappNetwork = content?.networks.find(
      (network) => network.name === 'Whatsapp',
    )
    if (whatsappNetwork) {
      setWhatsapp(whatsappNetwork)
    }
  }, [content, setWhatsapp])

  return (
    <ul className="space-y-3">
      <li className="max-w-60 text-center font-['Libre_Baskerville'] text-xl font-semibold lg:text-start">
        {content?.labelNameHome}
      </li>

      <li className="flex items-center gap-3.5 max-lg:justify-center">
        {content?.networks.map(
          (network, index) =>
            network.name !== 'Whatsapp' && (
              <Link
                key={index}
                href={network.url}
                target="_blank"
                rel="noopener"
                className="flex size-10 items-center justify-center rounded-full bg-white p-1.5 transition-all duration-200 hover:bg-white/85"
              >
                <Image
                  src={network.imageUrl}
                  alt={network.name}
                  width={49.03}
                  height={49.03}
                  className="text-black"
                />
              </Link>
            ),
        )}
      </li>
    </ul>
  )
}
