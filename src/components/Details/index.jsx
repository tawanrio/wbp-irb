export default function Description({ content, color,size, className}) {
    return (
        <>
        <div>

          {content?.map((text , tId)=>(
            <p key={tId} 
            id={`description_`}
            className={`
            md:text-lg
            text-base
            flex
            mb-2
            font-[400]
            text-justify
            text-[#666]
            ${className && className} 
            `}
            style={{ color: color ? color : '#666', ...(size && { fontSize: size }) }}>
              {text}
            </p>
          ))}
          </div>
          </>
    )
  }