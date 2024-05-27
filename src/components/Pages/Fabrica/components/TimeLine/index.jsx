export default function TimeLine() {
    const events = [
        {
            year: "1998",
            description: "Fundação da empresa"
        },
        {
            year: "Entre 1998 e 2007",
            description: "Nos tornamos especialistas e referência no mercado nas linhas de Rolamentos e Cubos de roda"
        },
        {
            year: "2007",
            description: "Início das importações"
        },
        {
            year: "2019",
            description: "Lançamento das linhas de Radiadores, Trizetas e Linha 6000"
        },
        {
            year: "2024",
            description: "Lançamento das linhas de Cubos Vazios e Eletroventiladores"
        }
    ];

    return (
        <section className="flex flex-col items-center" id="timeline">
            <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6 flex flex-col justify-between md:gap-10">
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>
                    {events.map((event, index) => (
                        <div key={index} className="mb-8 flex justify-between items-center w-full">
                            <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center w-full`}>
                                <div className="w-5/12">
                                    <div className="p-4 bg-gray-100 rounded shadow-md">
                                        <h2 className="text-xl font-semibold mb-2">{event.year}</h2>
                                        <p className="text-gray-700">{event.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-1/12">
                                    <div className="h-8 w-8 rounded-full bg-[#22326e] border-4 border-white shadow-md"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
