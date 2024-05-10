import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import FormDistributor from "./FormDistributor";

export default function RegisterForm({ inputs, colors }) {

  
  const [partnerType, setPartnerType] = useState("");



  const handlePartnerType = (value) => {
    setPartnerType(value);
    console.log(value);
  };

  return (
    <section className="flex flex-col items-center" id={`contact_`}>
      <div className="w-full max-w-7xl md:px-14 md:my-7 px-6 my-4 mb-10 flex flex-col justify-between gap-10">
        <SectionTitle title={"Cadastro"} line />
        <div className="flex w-[48%] flex-col">
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
                <option value="">Área de Atuação</option>
                <option value="distribuidoras">Distribuidoras</option>
                <option value="mecanicas">Mecânicas</option>
                <option value="autopecas">Autopeças</option>
              </select>
            </div>

            {partnerType === 'distribuidoras' && <FormDistributor partnerType={partnerType} />}
            {partnerType === 'mecanicas' && <FormDistributor partnerType={partnerType} />}
            {partnerType === 'autopecas' && <FormDistributor partnerType={partnerType} />}


      </div>
    </section>
  );
}
