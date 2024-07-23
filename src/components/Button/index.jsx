/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Link from 'next/link'
import { formatToViewPhone } from '@/utils/functions'

export default function ButtonTell({ phone, whatsapp }) {
  const formatedWhatsappNumber = whatsapp && formatToViewPhone(whatsapp?.number)
  const apiWhats = `https://api.whatsapp.com/send?phone=55${whatsapp?.number}`

  const formatedPhoneNumber = phone && formatToViewPhone(phone?.number)
  const actionPhone = `tel:+55${phone?.number}`
  return (
    <>
      {phone && (
        <Link
          href={actionPhone}
          target="_blank"
          style={{
            height: phone?.layout?.height,
            backgroundColor: phone?.layout?.colors.bg,
            border: phone?.layout?.border,
          }}
          className="flex flex-1 flex-col justify-center rounded-2xl bg-slate-800 px-5 py-3"
        >
          <div className="relative flex items-center">
            {phone?.icon && (
              <div className="relative h-10 w-10">
                <Image
                  src={phone?.icon}
                  alt={'Icone button'}
                  sizes="100vw"
                  fill
                  className="duration-500"
                />
              </div>
            )}
            <span
              style={{
                color: phone?.layout?.colors.text,
                fontWeight: phone?.layout?.weight,
              }}
              className={`ml-2 whitespace-nowrap text-center text-lg uppercase opacity-100 md:text-2xl ${phone?.number && 'group-hover:opacity-0'} duration-500 ${phone?.icon.url && 'ml-2'} `}
            >
              {formatedPhoneNumber}
            </span>
            {phone?.number && (
              <span
                style={{
                  color: phone?.layout?.colors.text,
                  fontSize: phone?.layout?.size,
                  fontWeight: phone?.layout?.weight,
                }}
                className={`absolute w-full scale-[.82] whitespace-nowrap text-center text-lg uppercase opacity-0 duration-700 group-hover:opacity-100 md:text-2xl ${phone?.icon.url && 'ml-2'} `}
              >
                {formatedPhoneNumber}
              </span>
            )}
          </div>
        </Link>
      )}

      {whatsapp && (
        <Link
          href={apiWhats}
          target="_blank"
          style={{
            height: whatsapp?.layout?.height,
            backgroundColor: '#72C971',
            border: '#ddd',
          }}
          className="flex flex-1 flex-col justify-center rounded-2xl bg-slate-800 px-5 py-3"
        >
          <div className="relative flex items-center">
            {whatsapp?.icon && (
              <div className="relative h-10 w-10">
                <Image
                  src={'/images/components/button/whatsapp.png'}
                  alt={'Icone button'}
                  sizes="100vw"
                  fill
                  className="duration-500"
                />
              </div>
            )}
            <span
              style={{ color: 'white', fontWeight: whatsapp?.layout?.weight }}
              className={`ml-2 whitespace-nowrap text-center text-lg uppercase opacity-100 md:text-2xl ${whatsapp?.number && 'group-hover:opacity-0'} duration-500 ${whatsapp?.icon.url && 'ml-2'} `}
            >
              {formatedWhatsappNumber}
            </span>
            {whatsapp?.number && (
              <span
                style={{
                  color: 'white',
                  fontSize: whatsapp?.layout?.size,
                  fontWeight: whatsapp?.layout?.weight,
                }}
                className={`absolute w-full scale-[.82] whitespace-nowrap text-center text-lg uppercase opacity-0 duration-700 group-hover:opacity-100 md:text-2xl ${whatsapp?.icon.url && 'ml-2'} `}
              >
                {formatedWhatsappNumber}
              </span>
            )}
          </div>
        </Link>
      )}
    </>
  )
}
