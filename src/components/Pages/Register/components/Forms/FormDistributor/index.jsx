import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";

export default function FormDistributor({ inputs, colors, partnerType }) {

  const [cnpj, setCnpj] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tradingName, settradingName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");
  const [logo, setLogo] = useState(null);

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleLogoChange = (e) => {
    // Handle file upload for logo here
    const file = e.target.files[0];
    setLogo(file);
  };

  const fetchAddress = async (cleanedValue) => {
    try {
      const url = `https://viacep.com.br/ws/${cleanedValue}/json/`;
      const returnAddress = await fetch(url).then((response) => {
        return response.json();
      });

      // setAddress(returnAddress);
      return returnAddress;
    } catch (error) {
      return null;
    }
  };

  const handleBlur = async () => {
    const cleanedValue = cep.replace(/\D/g, "");
    if (cleanedValue.length != 8) return;

    const fullAddress = await fetchAddress(cleanedValue);

    if (fullAddress.erro) {
      return toast.error("CEP não encontrado!");
    } else {
      insertAddress(fullAddress);
    }
  };

  const insertAddress = (fullAddress) => {
    setStreet(fullAddress.logradouro);
    setNeighborhood(fullAddress.bairro);
    setCity(fullAddress.localidade);
    setState(fullAddress.uf);
  };

  const insertDataIntoDB = async (data) => {
    console.log(data);
    try {
      // Conectar-se ao banco de dados
      // await connectMongoDB();

      const response = await fetch(
        "http://localhost:3000/api/registerPartner",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Inserir os dados na coleção "categories_collections"
      // await categories_collections.insertOne(data);
      // console.log("Dados inseridos na coleção 'categories_collections' com sucesso!");

      // Desconectar-se do banco de dados
      // await disconnectMongoDB();
    } catch (error) {
      // console.error("Erro ao inserir dados na coleção 'categories_collections':", error);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      setIsSending(true);
      setSuccessMessage("");
      setErrorMessage("");

      await insertDataIntoDB({
        cnpj,
        companyName,
        tradingName,
        partnerType,
        email,
        phone,
        street,
        number,
        neighborhood,
        city,
        state,
        logo,
      });

      // const response = await fetch('http://localhost:3000/api/sendemailregisterpartner', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     cnpj,
      //     companyName,
      //     tradingName,
      //     email,
      //     phone,
      //     city,
      //     state
      //   }),
      // });

      if (response.ok) {
        const responseData = await response.json();
        // console.log('Response:', responseData);
        // setSuccessMessage('Email enviado com sucesso!');
        // toast.success('Email enviado com sucesso!');
        resetForm();
      } else {
        // console.error('Erro ao enviar formulário:', response.statusText);
        toast.error("Falha ao enviar email.");
        // setErrorMessage('Falha ao enviar email.');
      }
    } catch (error) {
      // console.error('Erro ao enviar formulário:', error.message);
      toast.error("Falha ao enviar email.");
      // console.log('falha');
      // setErrorMessage('Falha ao enviar email.');
    } finally {
      setIsSending(false);
    }
  };


  return (
   
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          className="flex flex-col items-center gap-10"
        >
          <div className="w-full flex flex-col justify-between md:px-0 md:gap-10 md:my-0 gap-4">
            
            <div className="flex w-full flex-row justify-between flex-wrap">
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
                <label className="font-bold capitalize text-lg" htmlFor="logo">
                  Anexar Logomarca
                </label>
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
                <label className="font-bold capitalize text-lg" htmlFor="cep">
                  CEP
                </label>
                <InputMask
                  mask="99999-999"
                  maskPlaceholder=""
                  id="cep"
                  placeholder="CEP"
                  className="border py-2 px-4"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex w-[48%] flex-col">
                <label
                  className="font-bold capitalize text-lg"
                  htmlFor="street"
                >
                  Rua/Avenida
                </label>
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
                <label
                  className="font-bold capitalize text-lg"
                  htmlFor="number"
                >
                  Número
                </label>
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
                <label
                  className="font-bold capitalize text-lg"
                  htmlFor="neighborhood"
                >
                  Bairro
                </label>
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
                <label className="font-bold capitalize text-lg" htmlFor="city">
                  Cidade
                </label>
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
                <label className="font-bold capitalize text-lg" htmlFor="state">
                  Estado
                </label>
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
              style={{
                backgroundColor: colors?.button.bg,
                color: colors?.button.text,
              }}
              className="px-20 py-2 bg-cyan-600 text-white text-2xl rounded-full hover:scale-110 duration-500"
            >
              {isSending ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
     
  );
}
