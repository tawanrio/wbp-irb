/* eslint-disable prettier/prettier */
export const BackgroundImage = ({ children, backgrounds }) => {
  return (
    <div className="relative">
      {
        backgrounds ? (
          <>
            <div
              className="absolute inset-0 -z-50 bg-top bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${backgrounds.home.image})`,
                maxHeight: backgrounds.home.size,
              }}
            />
            <div
              className="absolute inset-0 -z-50 bg-bottom bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${backgrounds.automotive.image})`,
                minHeight: backgrounds.automotive.size,
                marginTop: backgrounds.automotive.margin
              }} />
            {children}
          </>
        ) : children
      }
    </div>
  )
}
