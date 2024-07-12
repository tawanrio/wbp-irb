export default function SectionTitle({ title, line, className }) {
    return (
        <div
        id={`section-title_`}
        className={` 
        ${className}
        flex
        items-center
        md:gap-10
        gap-2
        `}>
        
        <h2 className="  font-bold md:text-2xl text-[20px] uppercase" style={{color:'#c12025'}}>{title}</h2>
        {line === true && (

            <hr 
            className="
            flex-1
            h-1/2
            border-b-2
            border-t-0
            border-black
            "
            style={{borderColor:'#999'}}/>
            )}
        </div>
    )
}