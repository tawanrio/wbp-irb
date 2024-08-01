export default function Copyright({ content }) {
  const copyright = content?.items.find((item) => item.label === 'default')
  const colors = copyright?.colors

  return (
    <section
      style={{ background: colors?.bg, color: colors?.text }}
      className="flex justify-center px-2 py-5 text-[.8rem] md:py-10"
    >
      <small className="text-center text-xs">{copyright?.text}</small>
    </section>
  )
}
