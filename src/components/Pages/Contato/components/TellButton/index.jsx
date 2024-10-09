import Container from '@/components/Container'
import Image from 'next/image'
import React from 'react'
import { formatPhoneNumber } from '@/utils/functions'
export default function TellButton({ buttons }) {
  return (
    <div>
      <Container className={''}>
        <div
          className={
            'my-10 flex flex-col justify-center gap-8 md:my-0 md:flex-row'
          }
        >
          {buttons.map(
            (button, index) =>
              button.status && (
                <a
                  key={index}
                  href={button.href}
                  style={{
                    backgroundColor: button.colors.bg,
                    border: button.colors.border,
                    color: button.colors.text,
                    fontWeight: button.colors.weight,
                  }}
                  target="_blank"
                  className={'flex gap-4 rounded-full px-10 py-4 sm:text-5xl'}
                >
                  <Image
                    src={button.icon}
                    alt={button.label}
                    width={50}
                    height={24}
                  />
                  {formatPhoneNumber(button.number)}
                </a>
              ),
          )}
        </div>
      </Container>
    </div>
  )
}
