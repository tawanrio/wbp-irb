import SectionTitle from "../SectionTitle"

export default function Contact({contact}) {
  return (
    <section className="flex flex-col items-center " id={`contact_${crypto.randomUUID().slice(-8)}`}>
    <div className="w-full max-w-7xl md:px-14 md:my-5 px-6 my-4 mb-10 flex flex-col justify-between gap-10">
        <SectionTitle title={'Contato'} line/>
        <form className="flex flex-col items-center gap-10 ">
            <div
            className="
            w-full
            flex
            justify-between
            md:px-20
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
                    {contact.name && (
                    <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="nome">Nome</label>
                        <input type="text" id="nome" placeholder="Nome"
                        className="
                       border
                       py-2
                        px-4
                        "
                        />
                    </div>
                    )}
                    {contact.email && (
                      <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Email"
                        className="
                       border
                       py-2
                        px-4
                        "
                        />
                    </div>
                    )}
                    {contact.phone && (
                      <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="phone">Telefone</label>
                        <input type="text" id="phone" placeholder="Telefone"
                        className="
                       border
                       py-2
                        px-4
                        "
                        />
                    </div>
                    )}
                    {contact.subject && (
                      <div className="
                    flex
                    flex-col
                    ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="subject">Assunto</label>
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
                {contact.message && (
                     <div className="
                     flex
                     flex-col
                     w-full
                     ">
                        <label className="
                        font-bold
                        capitalize
                        text-lg
                        " htmlFor="message">Menssagem</label>
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
                className="
                bg-[#22326E]
                px-20
                py-2
                text-white
                text-2xl
                rounded-full
                shadow-[0px_0px_30px_-10px_rgba(0,0,0,1)]
                hover:shadow-[0px_0px_30px_-5px_rgba(0,0,0,1)]
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