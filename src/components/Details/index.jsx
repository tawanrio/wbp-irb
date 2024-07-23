export default function Description({ content, color, size, className }) {
  return (
    <>
      <div>
        {content?.map((text, tId) => (
          <p
            key={tId}
            id="description_"
            className={`mb-2 flex text-justify text-base font-[400] text-[#666] md:text-lg ${className && className} `}
            style={{
              color: color || '#666',
              ...(size && { fontSize: size }),
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </>
  )
}
