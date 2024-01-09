export default function Description({ content }) {
    return (
        <>
          {content?.map((text , tId)=>(
              <p key={tId} 
              id={`description_`}
              className="
              md:text-lg
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