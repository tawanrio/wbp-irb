export const Title = ({ title }) => {
  return (
    <section className="mx-auto mt-8 w-full max-w-6xl pb-8 sm:mt-12 sm:pb-14 md:mt-20">
      <h1 className="w-full max-w-md px-5 font-['Libre_Baskerville'] text-4xl font-medium text-white sm:max-w-xl sm:text-5xl lg:max-w-2xl lg:text-6xl">
        {title}
      </h1>
    </section>
  )
}
