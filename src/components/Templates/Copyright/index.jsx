export default function Copyright({ content }) {
  const copyright = content?.items.find((item) => item.label === 'default')

  return (
    <section className="flex justify-center px-2 py-5 md:py-10">
      <small className="rounded-full border border-solid border-[#FFFFFF4D] bg-[#D9D9D980] px-5 py-1.5 text-center text-xs">
        {copyright?.text}
      </small>
    </section>
  )
}
