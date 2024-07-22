export default function Description({ content, color, size, className }) {
  return (
    <>
      {content?.map((text, tId) => (
        <p
          key={tId}
          id="description_"
          className={`flex text-justify text-base font-[400] md:text-lg ${className && className} `}
          style={{
            color: color || '#666',
            ...(size && { fontSize: size }),
          }}
        >
          {text}
        </p>
      ))}
    </>
  )
}
