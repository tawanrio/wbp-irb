export default function SectionTitle({ title, line, className }) {
  return (
    <div
      id="section-title_"
      className={` ${className} flex items-center gap-2 md:gap-10`}
    >
      <h2
        className="text-[20px] font-bold uppercase md:text-2xl"
        style={{ color: '#c12025' }}
      >
        {title}
      </h2>
      {line && (
        <hr
          className="h-1/2 flex-1 border-b-2 border-t-0 border-black"
          style={{ borderColor: '#999' }}
        />
      )}
    </div>
  )
}
