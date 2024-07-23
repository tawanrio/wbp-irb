export default function Description({ content, color, size, className }) {
  return (
    <>
      {content?.map((text, tId) => (
        <span
          key={tId}
          id={`description_`}
          className={`flex flex-col text-justify text-base font-[400] md:text-lg ${className && className} `}
          style={{
            color: color || '#666',
            ...(size && { fontSize: size }),
          }}
        >
          {content[0].title.length > 0 && <b className="mb-2">{text?.title}</b>}
          <p>{text?.description}</p>
        </span>
      ))}
    </>
  )
}
