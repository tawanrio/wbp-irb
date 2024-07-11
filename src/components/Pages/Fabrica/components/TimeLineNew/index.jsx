import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function TimeLineNew() {
    const events = [
        { year: "1998", description: "Fundação da empresa" },
        { year: "1998-2007", description: "Nos tornamos especialistas e referência no mercado nas linhas de Rolamentos e Cubos de roda" },
        { year: "2007", description: "Início das importações" },
        { year: "2019", description: "Lançamento das linhas de Radiadores, Trizetas e Linha 6000" },
        { year: "2024", description: "Lançamento das linhas de Cubos Vazios e Eletroventiladores" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewIndex, setViewIndex] = useState(0);
    const [bulletsToShow, setBulletsToShow] = useState(5);
    const intervalRef = useRef(null);

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 3000);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setBulletsToShow(2);
                setViewIndex(Math.floor(currentIndex / 2) * 2);
            } else {
                setBulletsToShow(5);
                setViewIndex(Math.floor(currentIndex / 5) * 5);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [currentIndex]);

    useEffect(() => {
        resetInterval();
        return () => clearInterval(intervalRef.current);
    }, [events.length]);

    const nextEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        resetInterval();
    };

    const prevEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
        resetInterval();
    };

    const changeEvent = (index) => {
        setCurrentIndex(index);
        resetInterval();
    };

    return (
        <section className="flex flex-col items-center" id="timeline">
            <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6 flex flex-col items-center justify-between">
                <div className="w-full md:w-11/12 flex flex-col-reverse items-center gap-10">
                    <div className="text-center mt-4">
                        <h3 className="text-xl font-bold">{events[currentIndex].year}</h3>
                        <p className={`transition-opacity duration-500 opacity-100`}>{events[currentIndex].description}</p>
                    </div>
                    <div className="relative h-[100px] flex items-center justify-between overflow-hidden w-full">
                        <button onClick={prevEvent} className="p-2 mt-6 rounded-full w-10 h-10 flex items-center justify-center bg-white md:block">
                            <Image src="/images/arrow.svg" alt="Previous" width={24} height={24} className="transform rotate-90" />
                        </button>
                        <div className="flex h-full justify-center gap-2 items-center relative w-full overflow-x-auto snap-x snap-mandatory">
                            <div className="absolute inset-0 top-7 flex items-center justify-center">
                                <div className="w-full border-t-2" style={{ borderColor: "#22326E" }}></div>
                            </div>
                            {events.slice(viewIndex, viewIndex + bulletsToShow).map((event, index) => (
                                <div key={index} className="flex flex-col items-center relative z-10 snap-center">
                                    <span className="mb-1 w-32 text-center">{event.year}</span>
                                    <div 
                                        onClick={() => changeEvent(viewIndex + index)}
                                        className={`bg-white w-6 h-6 duration-500 rounded-full cursor-pointer border-2 hover:scale-125 ${viewIndex + index === currentIndex ? 'flex items-center justify-center' : ''}`}
                                        style={{ borderColor: "#22326E" }}
                                    >
                                        {viewIndex + index === currentIndex && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22326E" }}></div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={nextEvent} className="p-2 mt-6 rounded-full w-10 h-10 flex items-center justify-center bg-white md:block">
                            <Image src="/images/arrow.svg" alt="Next" width={24} height={24} className="transform -rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
