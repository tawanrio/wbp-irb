import Image from 'next/image'
import Link from 'next/link'

export default function SocialMidia({ content, setWhatsapp }) {
  return (
    <ul className="space-y-3">
      <li className="text-lg font-normal capitalize">{content?.labelName}</li>

      <li className="flex items-center gap-3.5">
        {content?.networks.map((network, index) => {
          network.name === 'Whatsapp' && setWhatsapp(network)

          return (
            network.name !== 'Whatsapp' && (
              <Link
                key={index}
                href={network.url}
                target="_blank"
                rel="noopener"
                className="flex size-9 items-center justify-center rounded-full bg-white transition-all duration-200 hover:bg-white/85"
              >
                <Image
                  src={network.imageUrl}
                  alt={network.name}
                  width={25}
                  height={25}
                />
              </Link>
            )
          )
        })}
      </li>
    </ul>
  )
}
