import Image from 'next/image'
import Link from 'next/link'
import { formatToViewPhone } from '@/utils/functions'

export default function ButtonTell({ phone, whatsapp }) {
  const formatPhone = (phoneNumber) =>
    phoneNumber && formatToViewPhone(phoneNumber?.number)
  const formatedWhatsappNumber = formatPhone(whatsapp)
  const formatedPhoneNumber = formatPhone(phone)

  const apiWhats = `https://api.whatsapp.com/send?phone=55${whatsapp?.number}`
  const actionPhone = `tel:+55${phone?.number}`

  const renderButton = (href, icon, altText, styles, formattedNumber) => (
    <Link
      href={href}
      target="_blank"
      style={styles}
      className="flex h-[3.875rem] flex-1 flex-row items-center gap-4 rounded-2xl bg-slate-800 px-5 py-2 duration-500 hover:scale-105 md:h-[4.375rem] md:py-4"
    >
      <figure className="relative size-10">
        <Image
          src={icon}
          alt={altText}
          sizes="100vw"
          fill
          className="!relative"
          style={{ minWidth: '40px', minHeight: '40px' }}
        />
      </figure>
      <span
        style={{ color: styles.color, fontWeight: styles.fontWeight }}
        className="!relative whitespace-nowrap text-center text-lg uppercase md:text-2xl"
      >
        {formattedNumber}
      </span>
    </Link>
  )

  return (
    <>
      {phone &&
        renderButton(
          actionPhone,
          phone.icon,
          'Ícone telefone',
          {
            backgroundColor: phone?.layout?.colors.bg,
            border: phone?.layout?.border,
            color: phone?.layout?.colors.text,
            fontWeight: phone?.layout?.weight,
          },
          formatedPhoneNumber,
        )}

      {whatsapp &&
        renderButton(
          apiWhats,
          '/images/components/button/whatsapp.png',
          'Ícone whatsapp',
          {
            backgroundColor: '#72C971',
            color: 'white',
            fontWeight: whatsapp?.layout?.weight,
          },
          formatedWhatsappNumber,
        )}
    </>
  )
}
