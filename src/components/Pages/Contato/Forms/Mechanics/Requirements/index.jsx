/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'

export default function Requirements({ setRequiments, resetInputs }) {
  const [certificateImg, setCertificateImg] = useState('')
  const [elevatorImg, setElevatorImg] = useState('')
  const [selectedEquipments, setSelectedEquipments] = useState([])

  const equipments = [
    'Torquímetro',
    'Paquímetro',
    'Micrometro',
    'Relógio comparador centesimal',
    'Base magnética',
    'Refratometro',
    'Balança de precisão',
    'Kit de teste de estanqueidade do sistema de arrefecimento',
    'Scanner automotivo',
    'Multímetro - alicate amperímetro',
    'Acesso aos manuais técnicos de manutenção',
    'Ferramentas manuais',
    'Macaco jacaré hidráulico',
    'Cavaletes',
  ]

  useEffect(() => {
    setCertificateImg('')
    setElevatorImg('')
    setSelectedEquipments([])
  }, [resetInputs])

  useEffect(() => {
    setRequiments({ certificateImg, elevatorImg, selectedEquipments })
  }, [certificateImg, elevatorImg, selectedEquipments])

  const handleImg = (event, setState) => {
    const file = event.target.files[0]
    setState(file)
  }

  const handleCheckboxChange = ({ target: { value, checked } }) => {
    setSelectedEquipments((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((equipment) => equipment !== value),
    )
  }

  return (
    <div className="mt-10">
      <SectionTitle title={'Pré-Requisitos'} line={true} />
      <div className="mt-5 flex w-full flex-row flex-wrap justify-between gap-5">
        <div className="flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Certificação Profissional *
          </label>
          <span className="text-sm text-slate-400">
            Anexar o seu certificado{' '}
          </span>
          <input
            type="file"
            id="logo"
            className="mt-2"
            accept="image/png, image/jpeg, application/pdf"
            onChange={(event) => handleImg(event, setCertificateImg)}
          />
          <span className="text-sm text-slate-400">
            Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
          </span>
        </div>
        <div className="flex w-[48%] flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Equipamento: Elevador *
          </label>
          <span className="text-sm text-slate-400">
            Anexar uma foto do seu elevador
          </span>
          <input
            type="file"
            id="logo"
            className="mt-2"
            accept="image/png, image/jpeg"
            onChange={(event) => handleImg(event, setElevatorImg)}
          />
          <span className="text-sm text-slate-400">
            Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
          </span>
        </div>

        <div className="flex w-full flex-col">
          <label className="text-lg font-bold">Ferramentas:</label>
          <span className="text-sm text-slate-400">
            Preencher quais ferramentas você possui
          </span>
          <div className="mt-2 flex flex-wrap justify-between gap-2">
            {equipments.map((equipment, index) => (
              <label key={index} className="cap mr-4 flex w-[48%] items-center">
                <input
                  type="checkbox"
                  value={equipment}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">{equipment}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
