import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import InputsAddress from "./../Components/InputsAddress";

export default function FormDistributor({ setPartnerData, resetInputs }) {

  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradingName, settradingName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');

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
      address
    })


  },[cnpj,companyName,tradingName,email,phone,logo,address])

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
  };

  const handleImg = (event, setState) => {
    // Handle file upload for logo here
    const file = event.target.files[0];
    setState(file);
  };




  return (
          <div className="w-full flex flex-col justify-between md:px-0 md:gap-10 md:my-0 gap-4">
            
            <div className="flex w-full flex-row justify-between flex-wrap">
            <div className="flex w-[48%] flex-col">
                <label
                  className="font-bold text-lg"
                  htmlFor="companyName"
                >
                  Razão social
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
                  className="font-bold text-lg"
                  htmlFor="tradingName"
                >
                  Nome fantasia
                </label>
                <input
                  type="text"
                  id="tradingName"
                  placeholder="Nome fantasia"
                  className="border py-2 px-4"
                  value={tradingName}
                  onChange={(e) => settradingName(e.target.value)}
                />
              </div>
              <div className="flex w-[48%] flex-col">
                <label className="font-bold text-lg" htmlFor="cnpj">
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
                <label className="font-bold text-lg" htmlFor="email">
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
                <label className="font-bold text-lg" htmlFor="phone">
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
                <label className="font-bold text-lg" htmlFor="logo">
                  Anexar logomarca
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
          </div>
     
  );
}
