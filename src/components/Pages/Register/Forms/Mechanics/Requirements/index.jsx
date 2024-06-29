import SectionTitle from "@/components/SectionTitle";
import { useEffect, useState } from "react";

export default function Requirements({setRequiments, resetInputs }) {

  const [certificateImg, setCertificateImg] = useState('');
  const [elevatorImg, setElevatorImg] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState([]);

  const equipments = [
    "Torquímetro",
    "Paquímetro",
    "Micrometro",
    "Relógio comparador centesimal",
    "Base magnética",
    "Refratometro",
    "Balança de precisão",
    "Kit de teste de estanqueidade do sistema de arrefecimento",
    "Scanner automotivo",
    "Multímetro - alicate amperímetro",
    "Acesso aos manuais técnicos de manutenção",
    "Ferramentas manuais",
    "Macaco jacaré hidráulico",
    "Cavaletes"
  ];

  useEffect(()=>{
    setCertificateImg('')
    setElevatorImg('')
    setSelectedEquipments([])
  },[resetInputs])

  useEffect(()=>{
    setRequiments({certificateImg,elevatorImg,selectedEquipments})
  },[certificateImg,elevatorImg,selectedEquipments])

  const handleImg = (event, setState) => {
    // Handle file upload for logo here
    const file = event.target.files[0];
    setState(file);
  };

  
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedEquipments([...selectedEquipments, value]);
      console.log(`O equipamento ${value} foi selecionado.`);
    } else {
      setSelectedEquipments(selectedEquipments.filter(equipment => equipment !== value));
      console.log(`O equipamento ${value} foi desmarcado.`);
    }
  };


 

  return (
    <div className="mt-10">
    <SectionTitle title={"Pré-Requisitos"} line={true} />
    <div className="flex w-full flex-row justify-between flex-wrap mt-5 gap-5">
      <div className="flex w-[48%] flex-col">
        <label className="font-bold  text-lg" htmlFor="logo">
          Certificação Profissional *
        </label>
        <span className="text-slate-400 text-sm">
        Anexar o seu certificado               </span>
        <input
          type="file"
          id="logo"
          className="mt-2"
          accept="image/png, image/jpeg, application/pdf"
          onChange={(event) => handleImg(event, setCertificateImg)}

          />
          <span className="text-slate-400 text-sm">
                Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
              </span>
              
      </div>
      <div className="flex w-[48%] flex-col">
        <label className="font-bold  text-lg" htmlFor="logo">
        Equipamento: Elevador *
        </label>
        <span className="text-slate-400 text-sm">
        Anexar uma foto do seu elevador
                     </span>
        <input
          type="file"
          id="logo"
          className="mt-2"
          accept="image/png, image/jpeg, application/pdf"
          onChange={(event) => handleImg(event, setElevatorImg)}
          />
           <span className="text-slate-400 text-sm">
                Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
              </span>
      </div>
      
      <div className="flex w-full flex-col">
        <label className="font-bold  text-lg">Ferramentas:</label>
        <span className="text-slate-400 text-sm">
        Preencher quais ferramentas você possui
        </span>
        <div className="flex flex-wrap justify-between gap-2 mt-2">
          {equipments.map((equipment, index) => (
            <label key={index} className="flex items-center w-[48%] mr-4 cap">
              <input
                type="checkbox"
                value={equipment}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 ">{equipment}</span>
            </label>
          ))}
        </div>
      </div>
      
    </div>
    </div>
  )
}
