export default function TimeLine() {
  const events = [
    {
      year: '1998',
      description: 'Fundação da empresa',
    },
    {
      year: 'Entre 1998 e 2007',
      description:
        'Nos tornamos especialistas e referência no mercado nas linhas de Rolamentos e Cubos de roda',
    },
    {
      year: '2007',
      description: 'Início das importações',
    },
    {
      year: '2019',
      description: 'Lançamento das linhas de Radiadores, Trizetas e Linha 6000',
    },
    {
      year: '2024',
      description: 'Lançamento das linhas de Cubos Vazios e Eletroventiladores',
    },
  ]

  return (
    <section className="flex flex-col items-center" id="timeline">
      <div className="my-4 flex w-full max-w-7xl flex-col justify-between px-6 md:my-7 md:gap-10 md:px-14">
        <div className="relative">
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-300"></div>
          {events.map((event, index) => (
            <div
              key={index}
              className="mb-8 flex w-full items-center justify-between"
            >
              <div
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} w-full items-center`}
              >
                <div className="w-5/12">
                  <div className="rounded bg-gray-100 p-4 shadow-md">
                    <h2 className="mb-2 text-xl font-semibold">{event.year}</h2>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
                <div className="flex w-1/12 items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-4 border-white bg-[#22326e] shadow-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
