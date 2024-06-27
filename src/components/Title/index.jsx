export default function Title({title}) {
  return (
    <div className="flex flex-col items-center"  id={`title_`}>
        <div className="md:max-w-7xl w-full md:px-14 md:mt-5 md:mb-0 my-4 px-6 ">
            <h2 className="capitalize font-bold md:text-3xl text-2xl animate-fadeOut" style={{color: "#c12025"}}>{title}</h2>
        </div>
    </div>
  )
}