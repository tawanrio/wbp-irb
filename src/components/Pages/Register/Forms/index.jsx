import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import FormDistributor from "./Distributor";
import FormAutoparts from "./Autoparts";
import FormMechanics from "./Mechanics";
import { toast } from "react-toastify";
import ReactDOMServer from 'react-dom/server';
import TemplateMailPartner from "../../Contato/Forms/Partner/TemplateMail";
import "react-toastify/dist/ReactToastify.css";
import {generateUniqueIdByCnpj, generateActionsLink} from "@/utils/functions"



export default function RegisterForm() {
  const [partnerType, setPartnerType] = useState('');
  const [inputs, setInputs] = useState(null)
  const [uniqueId, setUniqueId] = useState('')
  const [structureMail, setStructureMail] = useState({})

  const [html, setHtml] = useState('')
  const [actionsLink, setActionsLink] = useState('')
  const [responseMessage, setResponseMessage] = useState({
    success: '',
    error: ''
  })
  const [formData, setFormData] = useState({
    inputs: {
     info: {},
     address: {},
    },
     actionsLink: {},
     html: ''
   });
  const [resetInputs, setResetInputs] = useState(false) 
  const [sending, setSending] = useState(null)

  const handlePartnerType = (value) => {
    setPartnerType(value);
  };

  useEffect(()=>{
    if(formData.inputs?.info.cnpj){
      setUniqueId(generateUniqueIdByCnpj(formData.inputs?.info?.cnpj));
      setActionsLink(generateActionsLink(formData.inputs?.info?.cnpj, uniqueId));
    }
    setHtml(ReactDOMServer.renderToString(<TemplateMailPartner data={formData} uniqueId={uniqueId} actionsLink={actionsLink} />))

    setStructureMail({
      html,
      to: 'tawan.rio@webfoco.com',
      from: 'formData.inputs.info.tradingName',
      subject: 'Solicitação de cadastro de parceiro',
    });

    setFormData({
      inputs,
      structureMail,
      uniqueId
    })
    
  },[inputs])
  


const handleSubmitForm = async (e) => {
  e.preventDefault();

  try {
    setSending(true);
    
    const responseSendEmail = await sendEmailToAction(formData)
    
    if(!responseSendEmail) throw new Error('Enviar email');

    if(formData.inputs.info.partnerType){
      const responseInserDB = await insertDataIntoDB({
        formData
      });
      if(!responseInserDB) throw new Error('Database');
    }

    toast.success(responseMessage.success)
    setResetInputs(!(resetInputs))
} catch (error) {
  toast.error(`${responseMessage.error} - ${error.message}`);
} finally {
  setSending(false);
}
};

  const sendEmailToAction = async (data) =>{
    // const response = await fetch('http://localhost:3000/api/handlemail/sendmail', {
      const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/handlemail/sendmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData
        }),
      });
      return response.ok
  }

  const insertDataIntoDB = async (data) => {
          const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/handlemail/insertdb",
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
              Tipo de parceiro
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
            <FormDistributor setInputs={setInputs} resetInputs={resetInputs} partnerType={partnerType}   />
          )}
          {partnerType === "mecanicas" && (
            <FormMechanics setInputs={setInputs} resetInputs={resetInputs} partnerType={partnerType}   />
          )}
          {partnerType === "autopecas" && (
            <FormAutoparts setInputs={setInputs} resetInputs={resetInputs} partnerType={partnerType}   />
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
