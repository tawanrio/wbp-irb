export default function Container({ children, className }) {
  return (
    <section className="flex flex-col items-center" id="irb-contact_">
      <div
        className={`flex w-full max-w-7xl flex-col px-6 pt-6 md:gap-10 md:px-14 md:pb-10 ${className}`}
      >
        {children}
      </div>
    </section>
  )
}
