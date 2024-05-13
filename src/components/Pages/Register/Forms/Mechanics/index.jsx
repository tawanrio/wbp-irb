import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import InputsAddress from "./../Components/InputsAddress";
import Requirements from "./Requirements";

export default function FormMechanics({ setPartnerData, resetInputs }) {

  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradingName, settradingName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  
  const [requirements, setRequiments] = useState({})
  const [address, setAddress] = useState({});


  useEffect(()=>{
    setPartnerData({
      info:{
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
      const file = event.target.files[0];
      setState(file);
    };
  

  return (
   
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex flex-col items-center gap-10"
        >
          <div className="w-full flex flex-col justify-between md:px-0 md:gap-10 md:my-0 gap-4">
            
            <div className="flex w-full flex-row justify-between flex-wrap">
            <div className="flex w-[48%] flex-col">
                <label
                  className="font-bold capitalize text-lg"
                  htmlFor="companyName"
                >
                  Razão Social
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Razão Social"
                  className="border py-2 px-4"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="flex w-[48%] flex-col">
                <label
                  className="font-bold capitalize text-lg"
                  htmlFor="tradingName"
                >
                  Nome Fantasia
                </label>
                <input
                  type="text"
                  id="tradingName"
                  placeholder="Nome Fantasia"
                  className="border py-2 px-4"
                  value={tradingName}
                  onChange={(e) => settradingName(e.target.value)}
                />
              </div>
              <div className="flex w-[48%] flex-col">
                <label className="font-bold capitalize text-lg" htmlFor="cnpj">
                  CNPJ
                </label>
                <InputMask
                  mask="99.999.999/9999-99"
                  maskPlaceholder=""
                  id="cnpj"
                  placeholder="CNPJ"
                  className="border py-2 px-4"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>

           

              <div className="flex w-[48%] flex-col">
                <label className="font-bold capitalize text-lg" htmlFor="email">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  className="border py-2 px-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-[48%] flex-col">
                <label className="font-bold capitalize text-lg" htmlFor="phone">
                  Telefone
                </label>
                <InputMask
                  id="phone"
                  mask="(99) 99999-9999"
                  maskPlaceholder=""
                  placeholder="Telefone"
                  className="border py-2 px-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex w-[48%] flex-col">
                <label className="font-bold capitalize text-lg" htmlFor="logo">
                  Anexar Logomarca
                </label>
                <input
                  type="file"
                  id="logo"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleImg(e, setLogo)}
                />
              </div>
            </div>
            <InputsAddress setAddress={setAddress} resetInputs={resetInputs}/>
           <Requirements setRequiments={setRequiments} resetInputs={resetInputs}/>
          </div>
        </form>
     
  );
}
