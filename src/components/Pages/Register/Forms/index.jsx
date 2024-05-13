import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import FormDistributor from "./Distributor";
import FormAutoparts from "./Autoparts";
import FormMechanics from "./Mechanics";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RegisterForm() {
  const [partnerType, setPartnerType] = useState('');
  const [partnerData, setPartnerData] = useState({})
  const [resetInputs, setResetInputs] = useState(false) 
  const [sending, setSending] = useState(null)

  const handlePartnerType = (value) => {
    setPartnerType(value);
  };

useEffect(()=>{
  console.log(partnerData);
},[partnerData])
  function generateUniqueIdByCnpj(cnpj) {
    const firstFour = cnpj.replace(/\D/g, "").substring(0, 4).toString();
  
    const fourRandomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(4, '0');
    const twoRandomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(2, '0');
  
    const uniqueId = fourRandomNumbers + firstFour + twoRandomNumbers;
    
    return uniqueId;
}
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const uniqueId = generateUniqueIdByCnpj(partnerData.info.cnpj);

      if ( (!partnerData.info.cnpj ||
        !partnerData.info.companyName ||
        !partnerData.info.tradingName ||
        !partnerData.info.email ||
        !partnerData.info.phone ||
        !partnerData.address.city ||
        !partnerData.address.state ||
        !partnerType
        )) throw Error('Preencha todos os campos');

      const responseInserDB = await insertDataIntoDB({
        partnerType,
        partnerData,
        uniqueId
      });

      if(!responseInserDB) throw new Error('Database');
      
      const responseSendEmail = await sendEmailToAction({
        partnerType,
        partnerData,
        uniqueId
      })
      if(!responseSendEmail) throw new Error('Enviar email');

        toast.success("Cadastro Realizado, Aguarde aprovação")
        setResetInputs(!(resetInputs))
    } catch (error) {
      toast.error(`Erro ao realizar o cadastro - ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  const sendEmailToAction = async (data) =>{
    const response = await fetch('http://localhost:3000/api/sendemailregisterpartner', {
      // const response = await fetch('https://irbauto.com.br/api/sendemailregisterpartner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerType: data.partnerType,
          partnerData: data.partnerData,
          uniqueId: data.uniqueId
        }),
      });
      return response.ok
  }

  const insertDataIntoDB = async (data) => {
          const response = await fetch(
        "http://localhost:3000/api/registerPartner",
        // "https://irbauto.com.br/api/registerPartner",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      response.ok && console.log('dbOk');
      return response.ok
  };

  return (
    <section className="flex flex-col items-center" id={`register_`}>
      <div className="w-full max-w-7xl md:px-14 md:my-7 px-6 my-4 mb-10 flex flex-col justify-between gap-10">
        <SectionTitle title={"Cadastro"} line />

        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex flex-col items-center gap-10"
        >
          <div className="flex w-full flex-col">
            <label
              className="font-bold capitalize text-lg"
              htmlFor="partnerType"
            >
              Tipo de Parceiro
            </label>
            <select
              id="partnerType"
              className="border py-2 px-4"
              value={partnerType}
              onChange={(e) => handlePartnerType(e.target.value)}
            >
              <option value=''>Área de Atuação</option>
              <option value="distribuidoras">Distribuidoras</option>
              <option value="mecanicas">Mecânicas</option>
              <option value="autopecas">Autopeças</option>
            </select>
          </div>

          {partnerType === "distribuidoras" && (
            <FormDistributor setPartnerData={setPartnerData} resetInputs={resetInputs}   />
          )}
          {partnerType === "mecanicas" && (
            <FormMechanics setPartnerData={setPartnerData} resetInputs={resetInputs}   />
          )}
          {partnerType === "autopecas" && (
            <FormAutoparts setPartnerData={setPartnerData} resetInputs={resetInputs}   />
          )}

          { !(partnerType === '') && (
            <>
           

              <div>
                <button
                  // disabled={sending}
                  className="px-20 py-2 bg-[#22326e] text-white text-2xl rounded-full hover:scale-110 duration-500"
                >
                  {sending ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </>
          )}
        </form>
      
      </div>
    </section>
  );
}
