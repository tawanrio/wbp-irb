import Image from "next/image";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";

export default function CompanyValuesNew({ cards }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const companyValues = [
    {
      colors: {
        bg: "#22326E",
        text: "#fff",
        hr: "#6FBFD8"
      },
      title: "nosso sonho",
      content: {
        listStyle: "none",
        description: [
          "Ser a primeira escolha do cliente e líder mundial no segmento de peças automotivas."
        ],
      },
      image: "/images/components/companyValues/mission.webp"
    },
    {
      colors: {
        bg: "#353535",
        text: "#fff",
        hr: "#C12025"
      },
      title: "nosso combustível",
      content: {
        listStyle: "auto",
        description: [
          "Fazemos negócios com ética, integridade e profissionalismo.",
          "Somos movidos por surpreender nossos clientes e fornecer o melhor produto do mercado.",
          "Somos incansáveis em entregar qualidade, inovação e segurança em nossas soluções.",
          "Somos comprometidos em encontrar nossos colaboradores e gerar valor para a sociedade."
        ],
      },
      image: "/images/components/companyValues/vision.webp"
    },
    {
      colors: {
        bg: "#C12025",
        text: "#fff",
        hr: "#22326E"
      },
      title: "nossas atitudes",
      content: {
        listStyle: "disc",
        description: [
          "Atitude corajosa",
          "Impulsiona resultados",
          "Graxa na veia",
          "Cliente no centro",
          "Constrói parcerias",
          "Aprendizagem contínua",
        ],
      },
      image: "/images/components/companyValues/values.webp"
    }
  ];

  const handleMouseEnter = (index) => {
    setExpandedCard(index);
  };

  const handleMouseLeave = () => {
    setExpandedCard(null);
  };

  return (
    <section className="flex flex-col items-center mt-6" id={`company-values_`}>
      <div className="w-full md:max-w-7xl md:px-14 md:mb-10 my-4 px-6 flex flex-col max-w-lg md:gap-14">
        <SectionTitle title={'Missão, visão e valores'} line />
        <div
          className="
            md:justify-between
            flex 
            w-full
            md:flex-row
            flex-col
            gap-4
            justify-start
            scrollbar-hide
            md:p-0
            p-5
          "
        >
          <div className="w-full flex md:gap-5 ">
            {companyValues.map((card, index) => (
              <div
                key={index}
                style={{
                  background: card.colors.bg,
                  color: card.colors.text,
                  scrollSnapAlign: "start",
                }}
                className={`
                  md:w-full
                  md:min-w-[250px]
                  min-w-[240px]
                  flex 
                  flex-initial
                  flex-col 
                  cursor-pointer
                  rounded-3xl
                  shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)]
                  pt-4
                  md:pb-10
                  pb-6
                  overflow-hidden
                  group
                  relative
                  transition-all
                  duration-500
                  ease-in-out
                  ${expandedCard === index ? "!max-h-[500px]" : "max-h-[100px]"}
                `}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="
                    flex
                    items-end
                    md:px-10
                    md:pb-7
                    pb-4
                    px-5
                    max-h-[100px]
                    relative
                  "
                >
                  <div>
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={50}
                      height={50}
                      className="md:w-[60px] md:h-[50px] w-9 h-9"
                    />
                  </div>
                  <h3
                    className="
                      text-xl 
                      w-full 
                      font-bold 
                      right-0
                      text-center 
                      uppercase"
                  >
                    {card.title}
                  </h3>
                </div>
                 <div
                    className="
                      relative
                      transition-all
                      duration-500
                      ease-in-out
                      opacity-100
                    "
                  >
                    <div className="
                    relative
                    opacity-0  
                    group-hover:opacity-100
                    duration-1000
                    
                    ">
                   
                      <hr
                        className="
                          border-2
                          border-t-0
                        "
                      />
                      <hr
                        style={{ borderColor: card.colors.hr }}
                        className="
                          absolute
                          border-2
                          border-t-0
                          translate-y-[-2px]
                          translate-x-[200%]
                          z-50
                          w-1/3
                        "
                      />
              
                    </div>
                    <div
                      className="
                        md:mt-8
                        mt-4
                        text-center
                        font-light
                        px-5
                        
                        bg-white
                        transition-all
                        duration-500
                        ease-in-out
                        transform
                      "
                      style={{
                        backgroundColor: card.colors.bg,
                        borderColor: card.colors.hr,
                        color: card.colors.text,
                      }}
                    >
                      <ul className="list-inside  opacity-0  
                    group-hover:opacity-100
                    duration-500" style={{ listStyle: card.content?.listStyle }}>
                        {card.content.description?.map((text, tId) => (
                          <li
                            key={tId}
                            id={`description_`}
                            className={`
                              ${(card.content?.listStyle != 'none') && 'ml-6'}
                              md:text-lg
                              text-base
                              mb-1
                              text-start
                            `}
                          >
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
