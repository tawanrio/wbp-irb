import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import TemplateMailOthers from "./TemplateMail";
import ReactDOMServer from 'react-dom/server';

export default function FormOthers({ setFormData, resetInputs, formData }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState('');
  const [html, setHtml] = useState("");
  const [structureMail, setStructureMail] = useState({})
  const [address, setAddress] = useState({});
  

  useEffect(() => {
    setHtml(ReactDOMServer.renderToString(<TemplateMailOthers data={formData}/>))

    setStructureMail({
      html,
      to: 'marketing@irbauto.com.br',
      cco: 'tawan.rio@webfoco.com',
      from: 'Contato IRB',
      subject: 'Contato IRB',
    });

    setFormData({
      inputs:{
        info: {
        message,
        fullName,
        email,
        phone
        },
        address
    },
    structureMail
    });
  }, [fullName, email, phone, message]);

  useEffect(() => {
    resetForm();
  }, [resetInputs]);

  const resetForm = () => {
    setEmail("");
    setPhone("");
    setFullName("");
    setMessage("");
  };

  return (
    <div className="w-full flex flex-col justify-between md:px-0 md:gap-2 md:my-0 gap-2">
      <div className="flex w-full flex-row justify-between flex-wrap gap-2">
        <div className="flex w-[48%] flex-col">
          <div className="flex w-full mt-2 flex-col">
            <label className="font-bold text-lg" htmlFor="fullName">
              Nome completo
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Nome completo"
              required
              className="border py-2 px-4"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex w-full mt-2 flex-col">
            <label className="font-bold text-lg" htmlFor="email">
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

          <div className="flex w-full mt-2 flex-col">
            <label className="font-bold text-lg" htmlFor="phone">
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
        </div>
        <div className="flex w-[48%] flex-col">
          <div className="flex w-full mt-2 flex-col">
         
                  <label className="font-bold capitalize text-lg" htmlFor="message" >Mensagem</label>
                  <textarea
                    name="message"
                    id="message"
                    cols="50"
                    required
                    placeholder="Mensagem"
                    className="border w-full py-2 px-4 h-[196px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
            
          </div>
        </div>
      </div>

    </div>
  );
}
