import Image from "next/image";
import Description from "@/components/Description";
import SectionTitle from "@/components/SectionTitle";

export default function CompanyValues({ cards }) {
  return (
    <section className="flex flex-col items-center mt-6" id={`company-values_`}>
      <div className="w-full md:max-w-7xl md:px-14 md:mb-10 my-4 px-6 flex flex-col max-w-lg md:gap-14">
        <SectionTitle title={'Missão, vísão e valores'} line />
        <div
          className="
            md:justify-between>
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
            <div className="md:w-1/2 w-full flex items-center">
            <div
              style={{
                background: cards[0].colors.bg,
                color: cards[0].colors.text,
                scrollSnapAlign: "start",
              }}
              className={`
                 md:w-full
                md:min-w-[250px]
                min-w-[240px]
                flex 
                flex-initial
                flex-col 
                rounded-3xl
                shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)]
                pt-4
                md:pb-10
                pb-6
                `}
            >
              <div
                className="
                        flex
                        items-end
                        gap-6
                        md:px-10
                        md:pb-7
                        pb-4
                        px-5
                        relative
                        
                    "
              >
                <div>
                  <Image
                    src={cards[0].image}
                    alt={cards[0].title}
                    width={50}
                    height={50}
                    className="md:w-[50px] md:h-[50px] w-9 h-9"
                  />
                </div>
                <h3
                  className="
                        md:text-2xl 
                        text-2xl 
                        w-full 
                        font-bold 
                        right-0
                        text-center 
                        absolute 
                        uppercase"
                >
                  {cards[0].title}
                </h3>
              </div>
              <div className="relative">
                <hr
                  className="
                           border-2
                            border-t-0
                           "
                />
                <hr
                  style={{ borderColor: cards[0].colors.hr }}
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
                    "
              >
                <span>
                  {" "}
                  {cards[0].description?.map((text, tId) => (
                    <p
                      key={tId}
                      id={`description_`}
                      className="
              md:text-lg
              text-base
              mb-1
              flex
              text-start
              "
                    >
                      {text}
                    </p>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-7">
            <div
              style={{
                background: cards[1].colors.bg,
                color: cards[1].colors.text,
                scrollSnapAlign: "start",
              }}
              className={`
                 md:w-full
                md:min-w-[250px]
                min-w-[240px]
                flex 
                flex-initial
                flex-col 
                rounded-3xl
                shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)]
                pt-4
                md:pb-10
                pb-6
                `}
            >
              <div
                className="
                        flex
                        items-end
                        gap-6
                        md:px-10
                        md:pb-7
                        pb-4
                        px-5
                        relative
                        
                    "
              >
                <div>
                  <Image
                    src={cards[1].image}
                    alt={cards[1].title}
                    width={50}
                    height={50}
                    className="md:w-[50px] md:h-[50px] w-9 h-9"
                  />
                </div>
                <h3
                  className="
                        md:text-2xl 
                        text-2xl 
                        w-full 
                        font-bold 
                        right-0
                        text-center 
                        absolute 
                        uppercase"
                >
                  {cards[1].title}
                </h3>
              </div>
              <div className="relative">
                <hr
                  className="
                           border-2
                            border-t-0
                           "
                />
                <hr
                  style={{ borderColor: cards[1].colors.hr }}
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
                    "
              >
                <span>
                  {" "}
                  {cards[1].description?.map((text, tId) => (
                    <p
                      key={tId}
                      id={`description_`}
                      className="
              md:text-lg
              text-base
              flex
              text-center
              "
                    >
                      {text}
                    </p>
                  ))}
                </span>
              </div>
            </div>
            <div
              style={{
                background: cards[2].colors.bg,
                color: cards[2].colors.text,
                scrollSnapAlign: "start",
              }}
              className={`
                 md:w-full
                md:min-w-[250px]
                min-w-[240px]
                flex 
                flex-initial
                flex-col 
                rounded-3xl
                shadow-[0px_0px_25px_-10px_rgba(0,0,0,.6)]
                pt-4
                md:pb-10
                pb-6
                `}
            >
              <div
                className="
                        flex
                        items-end
                        gap-6
                        md:px-10
                        md:pb-7
                        pb-4
                        px-5
                        relative
                        
                    "
              >
                <div>
                  <Image
                    src={cards[2].image}
                    alt={cards[2].title}
                    width={50}
                    height={50}
                    className="md:w-[50px] md:h-[50px] w-9 h-9"
                  />
                </div>
                <h3
                  className="
                        md:text-2xl 
                        text-2xl 
                        w-full 
                        font-bold 
                        right-0
                        text-center 
                        absolute 
                        uppercase"
                >
                  {cards[2].title}
                </h3>
              </div>
              <div className="relative">
                <hr
                  className="
                           border-2
                            border-t-0
                           "
                />
                <hr
                  style={{ borderColor: cards[2].colors.hr }}
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
                    "
              >
                <span>
                  {" "}
                  {cards[2].description?.map((text, tId) => (
                    <p
                      key={tId}
                      id={`description_`}
                      className="
              md:text-lg
              text-base
              flex
              text-center
              "
                    >
                      {text}
                    </p>
                  ))}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
