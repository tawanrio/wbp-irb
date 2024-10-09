import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPhoneNumber } from '@/utils/functions'

export const TellButton = ({ buttons }) => {
  return (
    <ul className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-8 px-5 pb-10 pt-6">
      {buttons.map(
        (button, index) =>
          button.status && (
            <li className="w-fit" key={index}>
              <Link
                href={button.href}
                style={{
                  backgroundColor: button.colors.bg,
                  border: button.colors.border,
                  color: button.colors.text,
                  fontWeight: button.colors.weight,
                }}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-4 rounded-full px-6 py-2.5 text-2xl transition-all duration-200 hover:scale-95 sm:px-10 sm:py-4 sm:text-3xl md:text-4xl lg:text-5xl"
              >
                <Image
                  src={button.icon}
                  alt={button.label}
                  width={50}
                  height={24}
                />
                {formatPhoneNumber(button.number)}
              </Link>
            </li>
          ),
      )}
    </ul>
  )
}
