import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import InputsAddress from "./../Components/InputsAddress";
import TemplateMailWorkWithUs from "./TemplateMail";
import ReactDOMServer from 'react-dom/server';

export default function FormWorkWithUs({ setFormData, resetInputs, formData }) {

  const [cnpj, setCnpj] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [structureMail, setStructureMail] = useState({})
  const [html, setHtml] = useState("");


  const [address, setAddress] = useState({});


  useEffect(()=>{

    setHtml(ReactDOMServer.renderToString(<TemplateMailWorkWithUs data={formData}/>))

    setStructureMail({
      html,
      to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'Trabalhe conosco - IRB',
      subject: 'Trabalhe conosco',
    });

    setFormData({
      inputs:{
        info:{
          cnpj,
          fullName,
          email,
          phone,
          curriculum
        },
        address
      },
      structureMail
    })

  },[cnpj, fullName, email, phone, curriculum, address])

  useEffect(()=>{
  resetForm()
  },[resetInputs])

  const resetForm = () => {
    setCnpj('');
    setEmail('');
    setPhone('');
    setFullName('');
    setCurriculum('');
    setAddress({});
  };

  const handleImg = (event, setState) => {
    // Handle file upload for logo here
    const file = event.target.files[0];
    setState(file);
  };




  return (
          <div className="w-full flex flex-col justify-between md:px-0 md:gap-2 md:my-0 gap-2">
            
            <div className="flex w-full flex-row justify-between flex-wrap">
            <div className="flex w-[48%] mt-2 flex-col">
                <label
                  className="font-bold text-lg"
                  htmlFor="fullName"
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Nome completo"
                  className="border py-2 px-4"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>


              <div className="flex w-[48%] mt-2 flex-col">
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

              <div className="flex w-[48%] mt-2 flex-col">
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

              <div className="flex w-[48%] mt-2 flex-col">
                <label className="font-bold text-lg" htmlFor="logo">
                  Anexar currículo
                </label>
                <input
                  type="file"
                  id="logo"
                  accept="image/png, image/jpeg, application/pdf"
                  onChange={(e) => handleImg(e, setCurriculum)}
                />
                <span className="text-slate-400 text-sm">
                Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 3MB.
              </span>
              </div>
            </div>

            <InputsAddress setAddress={setAddress} resetInputs={resetInputs}/>
          </div>
     
  );
}
