import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatToViewPhone } from '@/utils/functions'
import iconTel from '@/../public/images/pages/contact/icon-tell.png'
import iconWhats from '@/../public/images/pages/contact/icon-whats.png'

const linkClasses =
  'flex items-center gap-4 rounded-full bg-white px-6 py-2.5 text-2xl font-normal text-[#213271] transition-all duration-200 hover:scale-95 sm:px-10 sm:py-4 sm:text-3xl md:text-4xl lg:text-5xl'

const PhoneLink = ({ phone, icon, href }) => (
  <li className="w-fit">
    <Link href={href} target="_blank" className={linkClasses}>
      <Image src={icon} alt={phone.label} width={50} height={24} />
      {formatToViewPhone(phone.number)}
    </Link>
  </li>
)

export const Telephones = ({ phones }) => {
  const phoneItems = phones
    .filter((phone) => phone.label === 'Telefone')
    .map((phone) => (
      <React.Fragment key={phone.number}>
        <PhoneLink
          phone={phone}
          icon={iconTel}
          href={`tel:+55${phone.number}`}
        />
        <PhoneLink
          phone={phone}
          icon={iconWhats}
          href={`https://api.whatsapp.com/send?phone=55${phone.number}`}
        />
      </React.Fragment>
    ))

  return (
    <ul className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-8 px-5 pb-10">
      {phoneItems}
    </ul>
  )
}
