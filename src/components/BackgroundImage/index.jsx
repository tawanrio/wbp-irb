export const BackgroundImage = ({ children }) => {
  return (
    <div className="relative">
      <div className="bg-background-home absolute inset-0 -z-50 min-h-[1997px] bg-cover bg-center bg-no-repeat" />
      <div className="bg-background-automotive absolute inset-0 -z-50 mt-[2500px] min-h-[3341px] bg-cover bg-bottom bg-no-repeat" />
      {children}
    </div>
  )
}
