/* eslint-disable prettier/prettier */
export const BackgroundImageFirst = ({ children, backgrounds }) => {
  return backgrounds ? (
    <div className="relative">
      <div
        className="absolute inset-0 -z-50 bg-top bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgrounds.home.image})`,
        }}
      />
      {children}
    </div>
  ) : children
}
