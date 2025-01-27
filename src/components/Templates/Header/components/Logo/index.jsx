import Link from 'next/link'
import Image from 'next/image'
export default function Logo({ content }) {
  return (
    <Link href={content?.logo.route || ''} className="w-20 lg:w-[109.81px]">
      <Image
        src={content?.logo.url}
        alt={content?.logo.alt}
        width={109.81}
        height={99.42}
        className="text-white"
      />
    </Link>
  )
}
