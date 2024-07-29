/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import { EQUIPMENTS } from '@/utils/constants'

export default function Requirements({ setRequiments, resetInputs }) {
  const [certificateImg, setCertificateImg] = useState(null)
  const [elevatorImg, setElevatorImg] = useState(null)
  const [selectedEquipments, setSelectedEquipments] = useState([])

  const certificateImgRef = useRef(null)
  const elevatorImgRef = useRef(null)
  const checkboxRefs = useRef([])

  useEffect(() => {
    setRequiments({ certificateImg, elevatorImg, selectedEquipments })
  }, [certificateImg, elevatorImg, selectedEquipments])

  useEffect(() => {
    resetForm()
  }, [resetInputs])

  const resetForm = () => {
    setCertificateImg(null)
    setElevatorImg(null)
    setSelectedEquipments([])

    if (certificateImgRef.current) {
      certificateImgRef.current.value = ''
    }

    if (elevatorImgRef.current) {
      elevatorImgRef.current.value = ''
    }

    checkboxRefs.current.forEach((checkbox) => {
      if (checkbox) {
        checkbox.checked = false
      }
    })
  }

  const handleImg = (event, setState) => {
    const file = event.target.files[0]
    setState(file)
  }

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target

    setSelectedEquipments((prevSelectedEquipments) => {
      if (checked) {
        return [...prevSelectedEquipments, value]
      } else {
        return prevSelectedEquipments.filter((equipment) => equipment !== value)
      }
    })
  }

  return (
    <div className="mt-10">
      <SectionTitle title="Pré-Requisitos" line={true} />
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Certificação Profissional *
          </label>
          <span className="text-sm text-slate-400">
            Anexar o seu certificado{' '}
          </span>
          <input
            id="logo"
            type="file"
            className="mt-2"
            ref={certificateImgRef}
            accept="image/png, image/jpeg, application/pdf"
            onChange={(event) => handleImg(event, setCertificateImg)}
          />
          <span className="mt-1 text-sm text-slate-400">
            Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
          </span>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold" htmlFor="logo">
            Equipamento: Elevador *
          </label>
          <span className="text-sm text-slate-400">
            Anexar uma foto do seu elevador
          </span>
          <input
            id="logo"
            type="file"
            className="mt-2"
            ref={elevatorImgRef}
            accept="image/png, image/jpeg, application/pdf"
            onChange={(event) => handleImg(event, setElevatorImg)}
          />
          <span className="mt-1 text-sm text-slate-400">
            Formatos suportados: JPEG, PNG, PDF; Tamanho máximo do arquivo: 5MB.
          </span>
        </div>
      </div>

      <div className="mt-5 flex w-full flex-col">
        <label className="text-lg font-bold">Ferramentas:</label>
        <span className="text-sm text-slate-400">
          Preencher quais ferramentas você possui
        </span>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {EQUIPMENTS.map((equipment, index) => (
            <label key={index} className="flex flex-row items-center">
              <input
                type="checkbox"
                value={equipment}
                onChange={handleCheckboxChange}
                ref={(el) => (checkboxRefs.current[index] = el)}
              />
              <span className="ml-2">{equipment}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
