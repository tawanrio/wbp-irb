export const Title = ({ title }) => {
  return (
    <h1 className="mx-auto mt-7 w-full max-w-7xl px-5 font-['Libre_Baskerville'] text-4xl text-white sm:mt-16 sm:text-5xl md:mt-32 lg:text-6xl">
      <strong>{title.first}</strong>
      <br />
      {title.last} <i>{title.italic}</i>
    </h1>
  )
}
