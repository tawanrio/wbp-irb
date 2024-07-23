/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Link from 'next/link'
import { formatPhoneNumber } from '@/utils/functions'
import { useState } from 'react'

export default function Button({ content }) {
  console.log(content)
  const [href] = useState(content.href)
  const [title] = useState(content.label)
  const [colors] = useState(content.colors)
  const [icon] = useState(content.icon)
  const [number] = useState(content.number)

  const formattedNumber = formatPhoneNumber(number)
  return (
    <Link
      href={href}
      target="_blank"
      style={{ backgroundColor: colors?.bg, border: colors?.border }}
      className="group flex w-full max-w-xs flex-col justify-center rounded-2xl bg-slate-800 px-5 py-4 duration-500 hover:scale-105"
    >
      <div className="relative flex items-center">
        {icon && (
          <div className="relative h-10 w-10">
            <Image
              src={icon}
              alt={'Icone button'}
              sizes="100vw"
              fill
              className="duration-500"
            />
          </div>
        )}
        <span
          style={{ color: colors?.text, fontWeight: colors?.weight }}
          className={`absolute w-full text-center text-lg uppercase opacity-100 duration-500 md:text-2xl ${icon && 'ml-2'} ${number && 'group-hover:opacity-0'} `}
        >
          {formattedNumber}
          {/* {title} */}
        </span>
        {number && (
          <span
            style={{ color: colors?.text, fontWeight: colors?.weight }}
            className={`absolute w-full text-center text-lg uppercase opacity-0 duration-500 md:text-2xl ${icon && 'ml-2'} group-hover:opacity-100`}
          >
            {formattedNumber}
          </span>
        )}
      </div>
    </Link>
  )
}
