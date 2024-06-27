import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import InputsAddress from "./../Components/InputsAddress";
import Requirements from "./Requirements";
import { createModifiedFile } from '@/utils/functions';

export default function FormMechanics({ setInputs, resetInputs, partnerType }) {

  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradingName, settradingName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  
  const [requirements, setRequiments] = useState({})
  const [address, setAddress] = useState({});


  useEffect(()=>{
    setInputs({
      info:{
        partnerType,
        cnpj,
        companyName,
        tradingName,
        email,
        phone,
        logo
    },
      address,
      requirements
    }) 
  },[cnpj,companyName,tradingName,email,phone,logo,address, requirements])

  useEffect(()=>{
    resetForm()
    },[resetInputs])
  
    const resetForm = () => {
      setCnpj('');
      setEmail('');
      setPhone('');
      setCompanyName('');
      settradingName('');
      setLogo('');
      setAddress({});
      setRequiments({});
    };
  
    const handleImg = (event, setState) => {
      // Handle file upload for logo here
      const file = createModifiedFile(event.target.files[0]);
      setState(file);
    };

  return (
   
       
          <div className="w-full flex flex-col justify-between md:px-0 md:gap-2 md:my-0 gap-4">
            
            <div className="flex w-full flex-row justify-between flex-wrap">
            <div className="flex w-[48%] mt-2 flex-col">
                <label
                  className="font-bold  text-lg"
                  htmlFor="companyName"
                >
                  Razão social
                </label>
                <input
                  type="text"
                  id="companyName"
                  required
                  placeholder="Razão social"
                  className="border py-2 px-4"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="flex w-[48%] mt-2 flex-col">
                <label
                  className="font-bold  text-lg"
                  htmlFor="tradingName"
                >
                  Nome fantasia
                </label>
                <input
                  type="text"
                  id="tradingName"
                  required
                  placeholder="Nome fantasia"
                  className="border py-2 px-4"
                  value={tradingName}
                  onChange={(e) => settradingName(e.target.value)}
                />
              </div>
              <div className="flex w-[48%] mt-2 flex-col">
                <label className="font-bold  text-lg" htmlFor="cnpj">
                  CNPJ
                </label>
                <InputMask
                  mask="99.999.999/9999-99"
                  maskPlaceholder=""
                  id="cnpj"
                  required
                  placeholder="CNPJ"
                  className="border py-2 px-4"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>

           

              <div className="flex w-[48%] mt-2 flex-col">
                <label className="font-bold  text-lg" htmlFor="email">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="E-mail"
                  className="border py-2 px-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-[48%] mt-2 flex-col">
                <label className="font-bold  text-lg" htmlFor="phone">
                  Telefone
                </label>
                <InputMask
                  id="phone"
                  mask="(99) 99999-9999"
                  maskPlaceholder=""
                  required
                  placeholder="Telefone"
                  className="border py-2 px-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex w-[48%] mt-2 flex-col">
                <label className="font-bold  text-lg" htmlFor="logo">
                  Anexar logomarca
                </label>
                <input
                  type="file"
                  id="logo"
                  required
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleImg(e, setLogo)}
                />
                <span className="text-slate-400 text-sm">
                Formatos suportados: JPEG, PNG; Dimensões: 400x200 pixels; Tamanho máximo do arquivo: 3MB.
              </span>
              </div>
            </div>
            <InputsAddress setAddress={setAddress} resetInputs={resetInputs}/>
           <Requirements setRequiments={setRequiments} resetInputs={resetInputs}/>
          </div>
      
     
  );
}
