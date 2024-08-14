import Link from 'next/link'
import Image from 'next/image'
export default function Logo({ content }) {
  return (
    <Link href={content.logo.route} className="w-20 md:w-36">
      <Image
        src={content.logo.url}
        alt={content.logo.alt}
        width={130}
        height={120}
      />
    </Link>
  )
}
