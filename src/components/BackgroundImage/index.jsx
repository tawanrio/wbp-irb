export const BackgroundImage = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-50 max-h-[2500px] bg-background-home bg-top bg-no-repeat" />
      <div className="absolute inset-0 -z-50 mt-[2500px] min-h-[3341px] bg-background-automotive bg-bottom bg-no-repeat" />
      {children}
    </div>
  )
}
