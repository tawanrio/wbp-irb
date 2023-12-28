export default function Title({title}) {
  return (
    <div className="flex flex-col items-center"  id={`title_${crypto.randomUUID().slice(-8)}`}>
        <div className="md:max-w-7xl w-full md:px-14 md:my-10 my-4 px-6 ">
            <h2 className="uppercase font-extrabold md:text-5xl text-2xl">{title}</h2>
        </div>
    </div>
  )
}