export const BackgroundImage = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-50 min-h-[1997px] bg-background-home bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 -z-50 mt-[2500px] min-h-[3341px] bg-background-automotive bg-cover bg-bottom bg-no-repeat" />
      {children}
    </div>
  )
}
