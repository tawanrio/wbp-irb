export const Subtitle = ({ subtitle }) => {
  return (
    <h2 className="mx-auto w-full max-w-6xl px-5 text-4xl uppercase text-[#982225] sm:text-5xl lg:text-6xl">
      <strong className="font-black">{subtitle.bold}</strong> {subtitle.default}
    </h2>
  )
}
