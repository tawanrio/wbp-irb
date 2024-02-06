export default function Description({ content, color,size, className}) {
    return (
        <>
          {content?.map((text , tId)=>(
              <p key={tId} 
              id={`description_`}
              className={`
              md:text-lg
              text-base
              flex
              font-[400]
              text-justify
              ${className && className} 
              `}
              style={{ color: color ? color : '#666', ...(size && { fontSize: size }) }}>
              {text}
            </p>
          ))}
          </>
    )
  }