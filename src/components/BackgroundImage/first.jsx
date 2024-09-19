/* eslint-disable prettier/prettier */
export const BackgroundImageFirst = ({ children, backgrounds }) => {
  return backgrounds ? (
    <>
      <div
        className="absolute inset-0 -z-50 bg-top bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgrounds.home.image})`,
          minHeight: backgrounds.home.size,
        }}
      />
      {children}
    </>
  ) : children
}
