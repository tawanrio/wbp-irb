export default function Title({title}) {
  return (
    <div className="flex flex-col items-center"  id={`title_`}>
        <div className="md:max-w-7xl w-full md:px-14 md:my-10 my-4 px-6 ">
            <h2 className="uppercase font-extrabold md:text-3xl text-2xl animate-fadeOut">{title}</h2>
        </div>
    </div>
  )
}