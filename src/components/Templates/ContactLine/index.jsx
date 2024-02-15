import Link from "next/link"

export default function ContactLine({content}) {
 
  return (
    <section className="relative "  id={`contactLine`} >
    {/* <section className="fixed w-[100vw] z-[99] "  id={`contactLine`} > */}
    <div 
    className="
    flex 
    justify-center
    bg-[#22326e]
    text-white  
    relative 
    " 
    id='containerBanner'>
      {content.nav[0].links.map((item,i) => (
    <Link 
    key={i+"contactLine"}
    href={item.route}
    className="
    mx-2
    text-sm
    px-4
    py-1
     duration-300
    hover:bg-[#586ab3]
    "
    > <span>{item.label}</span></Link>
  ))}
      </div>
    {/* <div 
    className="
    flex 
    justify-center
    bg-white
    text-black
    border-b-2 
    relative 
    " 
    id='containerBanner'>
      {content.nav[0].links.map(item => (
    <Link 
    href={item.route}
    className="
    mx-2
    text-sm
    px-4
    py-1
    duration-300
    hover:bg-[#404b74]
    hover:text-white
    "
    > <span>{item.label}</span></Link>
  ))}
      </div> */}
      </section>
  )
}
