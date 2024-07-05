import Description from "../Description";

export default function ContentDescription({ content, className }) {
  console.log(className);
  return (
    <article className={`flex flex-col items-center ${className}`} id={`content-description_`}>
      <div className="w-full max-w-7xl md:px-14 px-6 mb-7 mt-2  flex justify-between flex-col gap-6 animate-fadeOut">
       <Description content={content}/>
      </div>
    </article>
  )
}