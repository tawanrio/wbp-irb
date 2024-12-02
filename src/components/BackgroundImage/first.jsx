import { resolveImageUrl } from '@/utils/functions'

export const BackgroundImageFirst = ({ children, backgrounds }) => {
  return backgrounds ? (
    <div className="relative">
      <div
        className="absolute inset-0 -z-50 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${resolveImageUrl(backgrounds.home.image)})`,
        }}
      />
      {children}
    </div>
  ) : (
    children
  )
}
