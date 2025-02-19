import Image from 'next/image'
import Link from 'next/link'

export default function icon({ icon }) {
  return (
    <Link
      href={icon?.route}
      target="_blank"
      rel="noopener"
      className="relative size-14 duration-500 hover:scale-105"
    >
      <Image src={icon?.icon} alt={icon?.alt} sizes="100vw" fill />
    </Link>
  )
}
