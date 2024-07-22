/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import Image from 'next/image'
export default function Select({
  select,
  set,
  filter,
  content,
  setContent,
  textDefault,
}) {
  const handleSet = (e) => {
    set && set(e.target.value)
    content && setContent(e.target.value.split(','))
  }
  return (
    <div className="flex items-center justify-center">
      <select
        value={content}
        onChange={handleSet}
        className={`w-[300px] appearance-none rounded-lg border bg-[#D9D9D9] px-5 py-5 text-center text-base font-medium uppercase text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
      >
        <option value="">{textDefault}</option>

        {filter ? (
          <>
            {select
              .filter((option) => option.title === filter) // Filtra as opções com base no título
              .map((option) =>
                option?.items.map((filterOption, fId) => (
                  <option key={fId} value={filterOption.contentDescription}>
                    {filterOption.title}
                  </option>
                )),
              )}
          </>
        ) : (
          <>
            {select?.map((option, id) => (
              <option key={id} value={option.title}>
                {option.title}
              </option>
            ))}
          </>
        )}
      </select>
      <div className="relative h-[15px] w-[15px]">
        <Image
          fill
          sizes="100vw"
          src={'/images/components/icons/pol-filter.png'}
          alt="icon arrow select"
          className="translate-x-[-35px]"
        />
      </div>
    </div>
  )
}
