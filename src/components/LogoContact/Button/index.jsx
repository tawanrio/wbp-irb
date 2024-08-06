import Image from 'next/image'
import Link from 'next/link'
import { formatPhoneNumber } from '@/utils/functions'

export default function Button({ content }) {
  const { href, label, colors, icon, number } = content
  const formattedNumber = formatPhoneNumber(number)

  return (
    <Link
      href={href}
      target="_blank"
      style={{
        backgroundColor: colors?.bg,
        border:
          label === 'Whatsapp' ? '3px solid rgb(97, 194, 95)' : colors?.border,
      }}
      className="flex flex-1 flex-row items-center gap-4 rounded-2xl bg-slate-800 px-5 py-2 duration-500 hover:scale-105 md:py-4"
    >
      <figure className="relative size-10">
        <Image
          src={icon}
          alt={`Ícone ${label}`}
          sizes="100vw"
          fill
          className="!relative"
          style={{ minWidth: '40px', minHeight: '40px' }}
        />
      </figure>
      <span
        style={{ color: colors?.text, fontWeight: colors?.weight }}
        className="!relative whitespace-nowrap text-center text-lg uppercase md:text-2xl"
      >
        {formattedNumber}
      </span>
    </Link>
  )
}
