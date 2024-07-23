import Image from 'next/image'
import Link from 'next/link'

export default function SocialMidia({ content }) {
  return (
    <>
      <ul>
        <li className="py-2 text-[.9rem] font-light capitalize">
          {content?.label}
        </li>

        <li className="flex items-center">
          {content?.networks.map((network, nId) => (
            <Link key={nId} href={network?.url} target="_blank">
              <Image
                src={network?.imageUrl}
                alt={network?.name}
                width={30}
                height={30}
                className="mr-3"
              />
            </Link>
          ))}
        </li>
      </ul>
    </>
  )
}
