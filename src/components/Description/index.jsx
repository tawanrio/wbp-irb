export default function Description({ content }) {
    return (
        <>
          {content.map((text , tId)=>(
              <p key={tId} 
              id={`description_${crypto.randomUUID().slice(-8)}`}
              className="
              md:text-xl
              text-base
              flex
              font-[400]
              text-justify
              ">
              {text}
            </p>
          ))}
          </>
    )
  }