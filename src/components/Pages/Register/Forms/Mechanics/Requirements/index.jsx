import SectionTitle from "@/components/SectionTitle";
import { useEffect, useState } from "react";

export default function Requirements({setRequiments, resetInputs }) {

  const [certificateImg, setCertificateImg] = useState('');
  const [elevatorImg, setElevatorImg] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState([]);

  const equipments = [
    "torquímetro",
    "paquímetro",
    "micrometro",
    "relógio comparador centesimal",
    "base magnética",
    "refratometro",
    "balança de precisão",
    "kit de teste de estanqueidade do sistema de arrefecimento",
    "scanner automotivo",
    "multímetro - alicate amperímetro",
    "acesso aos manuais técnicos de manutenção",
    "ferramentas manuais",
    "macaco jacaré hidráulico",
    "cavaletes"
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
    <>
    <SectionTitle title={"Pré Requisitos"} line={true} />
    <div className="flex w-full flex-row justify-between flex-wrap gap-5">
      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="logo">
          Anexar formação profissional *
        </label>
        <input
          type="file"
          id="logo"
          className="mt-2"
          accept="image/png, image/jpeg"
          onChange={(event) => handleImg(event, setCertificateImg)}

          />
      </div>
      <div className="flex w-[48%] flex-col">
        <label className="font-bold capitalize text-lg" htmlFor="logo">
          Equipamento: Elevador *
        </label>
        <input
          type="file"
          id="logo"
          className="mt-2"
          accept="image/png, image/jpeg"
          onChange={(event) => handleImg(event, setElevatorImg)}
          />
      </div>
      
      <div className="flex w-full flex-col">
        <label className="font-bold capitalize text-lg">Equipamentos:</label>
        <div className="flex flex-wrap justify-between gap-2 mt-2">
          {equipments.map((equipment, index) => (
            <label key={index} className="flex items-center w-[48%] mr-4 cap">
              <input
                type="checkbox"
                value={equipment}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 capitalize">{equipment}</span>
            </label>
          ))}
        </div>
      </div>
      
    </div>
    </>
  )
}
