export default function Select({select, set, filter}) {
 
  return (
    <select onChange={(e) => set(e.target.value)}>
       <option value="">Select</option>

       {filter ?
  (
    <>
     {select
    .filter((option) => option.title === filter) // Filtra as opções com base no título
    .map((filteredOption) =>
      filteredOption.items.map((filterOption, fId) => (
        <option key={fId} value={filterOption.title}>
          {filterOption.title}
        </option>
      ))
    )}
    </>
  ) :   (
    <>
     {select.map((option, id)=>(
        <option key={id} value={option.title} >{option.title}</option>
      ))}
    </>
  )     
       }
    </select>
  )
}