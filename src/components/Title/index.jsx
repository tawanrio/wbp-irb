export default function Title({ title, className }) {
  return (
    <div className={`flex flex-col items-center ${className}`} id={`title_`}>
      <div className="my-4 w-full px-6 md:mb-0 md:mt-5 md:max-w-7xl md:px-14">
        <h2
          className="animate-fadeOut text-2xl font-bold uppercase md:text-3xl"
          style={{ color: '#c12025' }}
        >
          {title}
        </h2>
      </div>
    </div>
  )
}
