import SectionTitle from "../SectionTitle"

export default function Form({inputs, colors}) {
  const colorText = '#666'
  return (
    <section className="flex flex-col items-center " id={`contact_`}>
    <div className="w-full max-w-7xl md:px-14 md:my-7 px-6 my-4 mb-10 flex flex-col justify-between gap-10">
        <SectionTitle title={'Contato'} line/>
        <form className="flex flex-col items-center gap-10 ">
            <div
            className="
            w-full
            flex
            justify-between
            md:px-0
            md:gap-10
            md:my-0
            gap-4
            ">
                   <div className="
                    flex
                    w-1/2
                    flex-col
                gap-4
                    ">
                    {inputs?.name && (
                    <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="nome" style={{color:colorText}}>Nome</label>
                        <input type="text" id="nome" placeholder="Nome"
                        className="
                       border
                       py-2
                        px-4
                        "
                        />
                    </div>
                    )}
                    {inputs?.email && (
                      <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="email" style={{color:colorText}}>Email</label>
                        <input type="text" id="email" placeholder="Email"
                        className="
                       border
                       py-2
                        px-4
                        "
                        />
                    </div>
                    )}
                    {inputs?.phone && (
                      <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="phone" style={{color:colorText}}>Telefone</label>
                        <input type="text" id="phone" placeholder="Telefone"
                        className="
                       border
                       py-2
                        px-4
                        "
                        />
                    </div>
                    )}
                    {inputs?.subject && (
                      <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="subject" style={{color:colorText}}>Assunto</label>
                        <input type="text" id="subject" placeholder="Assunto"
                        className="
                        border
                        py-2
                        px-4
                        "
                        />
                    </div>
                    )}

                </div>
                <div className="
                flex
                w-1/2
                ">
                {inputs?.message && (
                     <div className="
                     flex
                     flex-col
                     w-full
                     ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="message" style={{color:colorText}}>Menssagem</label>
                        <textarea name="message" id="message" cols="50" rows="5" placeholder="Menssagem"
                         className="
                         border
                         w-full
                         py-2
                         px-4
                         h-full
                         "/>
                    </div>
                    )}
                </div>
            </div>
            <div>
                <button
                style={{backgroundColor: colors?.button.bg, color: colors?.button.text}}
                className="
                px-20
                py-2
                text-white
                text-2xl
                rounded-full
                hover:scale-110
                duration-500
                "
                >Enviar</button>
            </div>
        </form>
        
    </div>
</section>
  )
}