import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";

export default function InputsAddress({setAddress, resetInputs}) {

    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cep, setCep] = useState('');

    useEffect(()=>{
      const address = {
        street,
        number,
        neighborhood,
        city,
        state,
        cep
      }
      setAddress(address)
    },[street,number,neighborhood,city,state,cep])

    useEffect(()=>{
      reset()
    },[resetInputs])

    const reset = () => {
      setStreet('')
      setNumber('')
      setNeighborhood('')
      setCity('')
      setState('')
      setCep('')
    }

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
      setStreet(fullAddress.result.street);
      setNeighborhood(fullAddress.result.district);
      setCity(fullAddress.result.city);
      setState(fullAddress.result.state);
    };

    const fetchAddress = async (cleanedValue) => {
      try {
        // const url = `https://viacep.com.br/ws/${cleanedValue}/json/`;
        const url = `https://api.brasilaberto.com/v1/zipcode/${cleanedValue}`;
        const returnAddress = await fetch(url).then((response) => {
          return response.json();
        });
  
        // setAddress(returnAddress);
        return returnAddress;
      } catch (error) {
        return null;
      }
    };

  return (
    <div className="flex w-full flex-row justify-between flex-wrap">
    <div className="flex w-[48%] mt-2 flex-col">
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
    <div className="flex w-[48%] mt-2 flex-col">
      <label
        className="font-bold capitalize text-lg"
        htmlFor="street"
      > Rua/Avenida
      </label>
      <input
        type="text"
        required
        id="street"
        placeholder="Rua/Avenida"
        className="border py-2 px-4"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
    </div>

    <div className="flex w-[48%] mt-2 flex-col">
      <label
        className="font-bold capitalize text-lg"
        htmlFor="number"
      >
        Número
      </label>
      <input
        type="text"
        required
        id="number"
        placeholder="Número"
        className="border py-2 px-4"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </div>

    <div className="flex w-[48%] mt-2 flex-col">
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

    <div className="flex w-[48%] mt-2 flex-col">
      <label className="font-bold capitalize text-lg" htmlFor="city">
        Cidade
      </label>
      <input
        type="text"
        required
        id="city"
        placeholder="Cidade"
        className="border py-2 px-4"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>

    <div className="flex w-[48%] mt-2 flex-col">
      <label className="font-bold capitalize text-lg" htmlFor="state">
        Estado
      </label>
      <input
        type="text"
        id="state"
        required
        placeholder="Estado"
        className="border py-2 px-4"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  </div>
  )
}
