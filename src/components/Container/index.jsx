export default function Container({ className, children }) {
  return (
    <article
      className={`flex flex-col items-center ${className}`}
      id={`container`}
    >
      <div className="mb-7 mt-2 flex w-full max-w-7xl animate-fadeOut flex-col justify-between gap-6 px-6 md:px-14">
        {children}
      </div>
    </article>
  )
}
