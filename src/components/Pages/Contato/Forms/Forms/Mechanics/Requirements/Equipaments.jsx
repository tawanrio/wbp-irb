import { useEffect, useState } from "react";

export default function EquipmentForm({resetInputs}) {

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
      setSelectedEquipments([])
    },[resetInputs])

    
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setSelectedEquipments([...selectedEquipments, value]);
        } else {
          setSelectedEquipments(selectedEquipments.filter(equipment => equipment !== value));
        }
      };
  
    return (
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
    );
  }
  
  