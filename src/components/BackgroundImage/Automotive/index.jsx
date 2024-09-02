import Image from 'next/image'
import backgroundImage from '../../../../public/images/templates/background-image/automotive.png'

export const BackgroundImageAutomotive = ({ children }) => {
  return (
    <div className="relative">
      <Image
        src={backgroundImage}
        alt="Imagem de fundo"
        quality={100}
        width={1600}
        height={3341}
        className="absolute inset-x-0 bottom-0 -z-50 mx-auto w-full"
      />
      {children}
    </div>
  )
}
