import Image from 'next/image'
import backgroundImageAutomotive from '../../../public/images/templates/background-image/automotive.png'
import backgroundImageHome from '../../../public/images/templates/background-image/home.png'
import { cn } from '@/utils/cn'

export const BackgroundImage = ({ children, isHome }) => {
  return (
    <div className="relative">
      <Image
        src={isHome ? backgroundImageHome : backgroundImageAutomotive}
        alt="Imagem de fundo"
        quality={100}
        width={1600}
        height={isHome ? 1997 : 3341}
        className={cn(
          'absolute inset-x-0 -z-50 mx-auto w-full',
          isHome ? 'top-0 h-[1997px]' : 'bottom-0 h-[3341px]',
        )}
      />
      {children}
    </div>
  )
}
