import Description from '../Description'

export default function ContentDescription({ content, className }) {
  return (
    <article
      className={`flex flex-col items-center ${className}`}
      id={`content-description_`}
    >
      <div className="mb-7 mt-2 flex w-full max-w-7xl animate-fadeOut flex-col justify-between gap-6 px-6 md:px-14">
        <Description content={content} />
      </div>
    </article>
  )
}
