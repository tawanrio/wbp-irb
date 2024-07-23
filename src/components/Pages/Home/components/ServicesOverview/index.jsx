import Image from 'next/image'

export default function ServicesOverview({content, certificate}) {
    
 


  return (
    <section className="relative flex flex-col items-center" id="blog-carousel">
      <div className="w-full max-w-7xl px-6 my-4 flex flex-col justify-between gap-4 md:px-14 md:my-7 md:gap-10">

      
    <div className="flex flex-col gap-4 md:flex-row md:gap-10">
      {content.map((card, index) => (
        <div key={index} className="w-full flex flex-col gap-4 md:w-1/3">
          <div className="card rounded-xl flex flex-col items-center shadow-md p-8 flex-1 h-44">
            <h3 className="text-2xl font-bold text-[#AF231C] uppercase">{card.title}</h3>
            <p className="text-center text-lg text-[#666]">{card.description}</p>
          </div>
          <div className="flex">
            {/* Adicione aqui o conteúdo adicional dentro do segundo div */}
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center flex-wrap gap-4">
      {certificate?.map((icon, indexIcon) => (
        <div key={indexIcon} className="relative w-1/2 h-24 md:w-1/5">
          <Image
            src={icon.url}
            alt={icon.alt}
            fill
            sizes="100%"
            quality={100}
            className={`p-0 object-contain !h-[80px] ${icon.bg ? 'bg-[#AF231C] rounded-md !p-1 my-1 !h-[70px]' : ''}`}
          />
        </div>
      ))}
    </div>
    </div>
  </section>
  
  )
}
