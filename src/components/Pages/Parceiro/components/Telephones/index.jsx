import Image from 'next/image'
import Link from 'next/link'
import { formatToViewPhone } from '@/utils/functions'
import iconTel from '@/../public/images/pages/contact/icon-tell.png'
import iconWhats from '@/../public/images/pages/contact/icon-whats.png'

export const Telephones = ({ phones }) => {
  return (
    <ul className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-8 px-5 pb-12">
      {phones.map(
        (phone, index) =>
          phone.label === 'Telefone' && (
            <>
              <li key={index} className="w-fit">
                <Link
                  href={`https://api.whatsapp.com/send?phone=55${phone.number}`}
                  target="_blank"
                  className="flex items-center gap-4 rounded-full bg-white px-6 py-2.5 text-2xl font-normal text-[#213271] sm:px-10 sm:py-4 sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  <Image
                    src={iconTel}
                    alt={phone.label}
                    width={50}
                    height={24}
                  />
                  {formatToViewPhone(phone.number)}
                </Link>
              </li>
              <li key={index} className="w-fit">
                <Link
                  href={`tel:+55${phone.number}`}
                  target="_blank"
                  className="flex items-center gap-4 rounded-full bg-white px-6 py-2.5 text-2xl font-normal text-[#213271] sm:px-10 sm:py-4 sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  <Image
                    src={iconWhats}
                    alt={phone.label}
                    width={50}
                    height={24}
                  />
                  {formatToViewPhone(phone.number)}
                </Link>
              </li>
            </>
          ),
      )}
    </ul>
  )
}
