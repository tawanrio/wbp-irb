export default function Title({title}) {
  return (
    <div className="flex flex-col items-center"  id={`title_`}>
        <div className="md:max-w-7xl w-full md:px-14 md:my-5 my-4 px-6 ">
            <h2 className="capitalize font-bold md:text-3xl text-2xl animate-fadeOut" style={{color: "#666"}}>{title}</h2>
        </div>
    </div>
  )
}