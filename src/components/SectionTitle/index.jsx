export default function SectionTitle({ title, line, className }) {
    return (
        <div
        id={`section-title_${crypto.randomUUID().slice(-8)}`}
        className={` 
        ${className}
        flex
        items-center
        md:gap-10
        gap-2
        `}>
        
        <h2 className="uppercase font-extrabold md:text-4xl text-xl">{title}</h2>
        {line === true && (

            <hr 
            className="
            flex-1
            h-1/2
            border-b-2
            border-t-0
            border-black
            "/>
            )}
        </div>
    )
}