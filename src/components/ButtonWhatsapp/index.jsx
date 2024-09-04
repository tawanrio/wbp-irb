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
      className="absolute -bottom-10 right-4 flex size-20 rounded-full bg-[#00c327] p-4 transition-all duration-200 hover:scale-95 md:-bottom-16 md:right-14 md:size-[100px]"
    >
      <Image src={whatsappIcon} alt="WhatsApp Ícone" width={120} height={120} />
    </Link>
  )
}
