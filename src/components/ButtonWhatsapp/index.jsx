import Image from 'next/image'
import Link from 'next/link'
import whatsappIcon from '../../../public/images/templates/footer/whatsapp-white.png'

export const ButtonWhatsapp = ({ whatsapp }) => {
  return (
    <Link
      href={whatsapp?.url || '/'}
      target="_blank"
      rel="noopener"
      aria-label={whatsapp?.name}
      className="fixed bottom-3 right-3 z-10 flex size-20 rounded-full bg-[#00c327] p-4 transition-all duration-200 hover:scale-95 sm:bottom-6 sm:right-6"
    >
      <Image
        src={whatsappIcon}
        alt="Ícone do WhatsApp"
        width={120}
        height={120}
      />
    </Link>
  )
}
