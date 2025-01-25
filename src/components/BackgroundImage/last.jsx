import { resolveImageUrl } from '@/utils/functions'

export const BackgroundImageLast = ({ children, backgrounds }) => {
  return backgrounds ? (
    <div className="relative">
      <div
        className="absolute inset-0 -z-50 h-full w-full bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url(${resolveImageUrl(backgrounds.automotive.image)})`,
        }}
      />
      {children}
    </div>
  ) : (
    children
  )
}
