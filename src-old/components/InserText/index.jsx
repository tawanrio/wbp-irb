export default function Description({ content, color,size, className}) {
  return (
      <>
          {content?.map((text , tId)=>(
              <span key={tId} 
              id={`description_`}
              className={`
              md:text-lg
              text-base
              flex
              flex-col
              font-[400]
              text-justify
              ${className && className} 
              `}
              style={{ color: color ? color : "#666", ...(size && { fontSize: size }) }}>
              {(content[0].title.length > 0) && (<b className="mb-2">{text?.title}</b>)}
              <p>{text?.description}</p>
            </span>
          ))}
        
      </>
  )
}