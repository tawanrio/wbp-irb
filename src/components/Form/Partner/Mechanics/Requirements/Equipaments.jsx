import { useEffect, useState } from 'react'

export default function EquipmentForm({ resetInputs }) {
  const [selectedEquipments, setSelectedEquipments] = useState([])

  const equipments = [
    'torquímetro',
    'paquímetro',
    'micrometro',
    'relógio comparador centesimal',
    'base magnética',
    'refratometro',
    'balança de precisão',
    'kit de teste de estanqueidade do sistema de arrefecimento',
    'scanner automotivo',
    'multímetro - alicate amperímetro',
    'acesso aos manuais técnicos de manutenção',
    'ferramentas manuais',
    'macaco jacaré hidráulico',
    'cavaletes',
  ]

  useEffect(() => {
    setSelectedEquipments([])
  }, [resetInputs])

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setSelectedEquipments([...selectedEquipments, value])
    } else {
      setSelectedEquipments(
        selectedEquipments.filter((equipment) => equipment !== value),
      )
    }
  }

  return (
    <div className="flex w-full flex-col">
      <label className="text-lg font-bold capitalize">Equipamentos:</label>
      <div className="mt-2 flex flex-wrap justify-between gap-2">
        {equipments.map((equipment, index) => (
          <label key={index} className="cap mr-4 flex w-[48%] items-center">
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
  )
}
