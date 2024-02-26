import { useState } from 'react';
import SectionTitle from "../SectionTitle";

export default function Form({ inputs, colors }) {
  const colorText = '#666';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () =>{
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      setIsSending(true);
      setSuccessMessage('');
      setErrorMessage('');

      const response = await fetch('https://irbauto.com.br/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          tel: phone,
          subject:subject ? subject :'Novo Contato',
          message,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log('Response:', responseData);
        setSuccessMessage('Email enviado com sucesso!');
        resetForm()
      } else {
        // console.error('Erro ao enviar formulário:', response.statusText);
        setErrorMessage('Falha ao enviar email.');
      }
    } catch (error) {
      // console.error('Erro ao enviar formulário:', error.message);
      setErrorMessage('Falha ao enviar email.');
    } finally {
      setIsSending(false); 
    }
  };

  return (
    <section className="flex flex-col items-center" id={`contact_`}>
      <div className="w-full max-w-7xl md:px-14 md:my-7 px-6 my-4 mb-10 flex flex-col justify-between gap-10">
        <SectionTitle title={'Contato'} line />
        <form onSubmit={(e) => handleSubmitForm(e)} className="flex flex-col items-center gap-10">
          <div className="w-full flex justify-between md:px-0 md:gap-10 md:my-0 gap-4">
            <div className="flex w-1/2 flex-col gap-4">
              {inputs?.name && (
                <div className="flex flex-col">
                  <label className="font-bold capitalize text-lg" htmlFor="nome" style={{ color: colorText }}>Nome</label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Nome"
                    className="border py-2 px-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              {inputs?.email && (
                <div className="flex flex-col">
                  <label className="font-bold capitalize text-lg" htmlFor="email" style={{ color: colorText }}>Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="border py-2 px-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              {inputs?.phone && (
                <div className="flex flex-col">
                  <label className="font-bold capitalize text-lg" htmlFor="phone" style={{ color: colorText }}>Telefone</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Telefone"
                    className="border py-2 px-4"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              )}
              {inputs?.subject && (
                <div className="flex flex-col">
                  <label className="font-bold capitalize text-lg" htmlFor="subject" style={{ color: colorText }}>Assunto</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Assunto"
                    className="border py-2 px-4"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="flex w-1/2">
              {inputs?.message && (
                <div className="flex flex-col w-full">
                  <label className="font-bold capitalize text-lg" htmlFor="message" style={{ color: colorText }}>Mensagem</label>
                  <textarea
                    name="message"
                    id="message"
                    cols="50"
                    rows="5"
                    placeholder="Mensagem"
                    className="border w-full py-2 px-4 h-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              disabled={isSending}
              style={{ backgroundColor: colors?.button.bg, color: colors?.button.text }}
              className="px-20 py-2 text-white text-2xl rounded-full hover:scale-110 duration-500"
            >
              {isSending ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
          {successMessage && (
            <p className="text-green-600 mt-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
