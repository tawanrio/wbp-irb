import Image from "next/image"
import Link from "next/link"
import {formatPhoneNumber} from "@/utils/functions"
import { useState } from "react"

export default function Button({content}) {

  console.log(content);
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
      className="w-full max-w-xs px-5 py-4 rounded-2xl bg-slate-800 flex flex-col justify-center
       hover:scale-105 duration-500 group"
    >
      <div className="flex items-center relative">
        {icon && (
          <div className="relative w-10 h-10">
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
          className={`
          md:text-2xl
          text-lg
          absolute
          w-full
          text-center
          uppercase
          opacity-100
          duration-500
          ${icon && 'ml-2'}
          ${number && 'group-hover:opacity-0'}
          `}
        >
          {title}
        </span>
        {number && (
          <span
            style={{ color: colors?.text, fontWeight: colors?.weight }}
            className={`
            md:text-2xl
            text-lg
            absolute
            w-full
            text-center
            uppercase
            opacity-0
            duration-500
            ${icon && 'ml-2'}
            group-hover:opacity-100
            `}
          >
            {formattedNumber}
          </span>
        )}
      </div>
    </Link>
  );
}