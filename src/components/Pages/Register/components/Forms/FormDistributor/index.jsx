import { useState } from 'react';
import SectionTitle from "@/components/SectionTitle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function FormDistributor({inputs, colors}) {
    const colorText = '#666';

    const [cnpj, setCnpj] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [fantasyName, setFantasyName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(null);
    const [subject, setSubject] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cep, setCep] = useState('');
    const [logo, setLogo] = useState(null);


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

    const handleLogoChange = (e) => {
        // Handle file upload for logo here
        const file = e.target.files[0];
        setLogo(file);
      };

      const getAddressByCEP = (cep) => {
        // Check if the CEP has 8 digits
        if (cep.length !== 8 || isNaN(cep)) {
            return Promise.reject("Invalid CEP. The CEP must contain exactly 8 digits.");
        }
    
        // Make request to ViaCEP API
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to query the ViaCEP service. Please try again later.");
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    throw new Error("CEP not found.");
                }
                const address = {
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf
                };
                return address;
            });
    }
    const fetchAddress = async () => {
      try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          setAddress(response.data);
          setError('');
      } catch (error) {
          setAddress(null);
          setError('CEP not found.');
      }
  };
    const handleCep = (cep) =>{
      // Remove caracteres não numéricos do valor do CEP
      const cleanedValue = cep.replace(/\D/g, '');

      // Verifica se o valor limpo tem mais de 8 dígitos
      if (cleanedValue.length > 8) {
          return;
      }

      // Aplica a máscara de CEP (formato XXXXX-XXX)
      let maskedCep = cleanedValue.replace(/^(\d{5})(\d)/, '$1-$2');

      // Atualiza o estado do CEP
      setCep(maskedCep);

    }
    const handleBlur = () => {
        console.log('teste');
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
          // setSuccessMessage('Email enviado com sucesso!');
          // toast.success('Email enviado com sucesso!');
          resetForm()
        } else {
          // console.error('Erro ao enviar formulário:', response.statusText);
          toast.error('Falha ao enviar email.');
          // setErrorMessage('Falha ao enviar email.');
        }
      } catch (error) {
        // console.error('Erro ao enviar formulário:', error.message);
        toast.error('Falha ao enviar email.');
        // console.log('falha');
        // setErrorMessage('Falha ao enviar email.');
      } finally {
        setIsSending(false); 
      }
    };
  
    return (
      <section className="flex flex-col items-center" id={`contact_`}>
        <div className="w-full max-w-7xl md:px-14 md:my-7 px-6 my-4 mb-10 flex flex-col justify-between gap-10">
          <SectionTitle title={'Cadastro'} line />
          <form onSubmit={(e) => handleSubmitForm(e)} className="flex flex-col items-center gap-10">
            <div className="w-full flex flex-col justify-between md:px-0 md:gap-10 md:my-0 gap-4">
              <div className="flex w-full flex-row justify-between flex-wrap">
              
        <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="cnpj">CNPJ</label>
        <input
          type="text"
          id="cnpj"
          placeholder="CNPJ"
          className="border py-2 px-4"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
      </div>

      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="companyName">Razão Social</label>
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
        <label className="font-bold capitalize text-lg" htmlFor="fantasyName">Nome Fantasia</label>
        <input
          type="text"
          id="fantasyName"
          placeholder="Nome Fantasia"
          className="border py-2 px-4"
          value={fantasyName}
          onChange={(e) => setFantasyName(e.target.value)}
        />
      </div>

      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="email">E-mail</label>
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
        <label className="font-bold capitalize text-lg" htmlFor="phone">Telefone</label>
        <input
          type="tel"
          id="phone"
          placeholder="Telefone"
          className="border py-2 px-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

    

      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="logo">Anexar Logomarca</label>
        <input
          type="file"
          id="logo"
          accept="image/png, image/jpeg"
          onChange={handleLogoChange}
        />
      </div>
            
              </div>
              
              <div className="flex w-full flex-row justify-between flex-wrap">
              <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          placeholder="CEP"
          className="border py-2 px-4"
          value={cep}
          onChange={(e) => handleCep(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
              <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="street">Rua/Avenida</label>
        <input
          type="text"
          id="street"
          placeholder="Rua/Avenida"
          className="border py-2 px-4"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="number">Número</label>
        <input
          type="text"
          id="number"
          placeholder="Número"
          className="border py-2 px-4"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="neighborhood">Bairro</label>
        <input
          type="text"
          id="neighborhood"
          placeholder="Bairro"
          className="border py-2 px-4"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </div>

      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="city">Cidade</label>
        <input
          type="text"
          id="city"
          placeholder="Cidade"
          className="border py-2 px-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="state">Estado</label>
        <input
          type="text"
          id="state"
          placeholder="Estado"
          className="border py-2 px-4"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

     
                </div>
          
            </div>
            <ToastContainer>

            {successMessage && (
              <p className="text-green-600 mt-2">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 mt-2">{errorMessage}</p>
            )}
            </ToastContainer>
            <div>
              
              <button
                disabled={isSending}
                style={{ backgroundColor: colors?.button.bg, color: colors?.button.text }}
                className="px-20 py-2 bg-cyan-600 text-white text-2xl rounded-full hover:scale-110 duration-500"
              >
                {isSending ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
         
          </form>
        </div>
      </section>
  )
}
