/* eslint-disable prettier/prettier */
export const BackgroundImageLast = ({ children, backgrounds }) => {
  return backgrounds ? (
    <div className="relative">
      <div
        className="absolute inset-0 -z-50 bg-bottom bg-no-repeat bg-cover w-full h-full"
        style={{
          backgroundImage: `url(${backgrounds.automotive.image})`,
        }}
      />
      {children}
    </div>
  ) : children
}
