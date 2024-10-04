import { formatToViewPhone } from '@/utils/functions'

export const Maps = ({ googleMapsUrl, collections }) => {
  return (
    <div className="relative flex flex-row">
      <ul className="h-[46rem] w-full max-w-[348px] space-y-4 overflow-y-auto rounded-l-[19.51px] bg-white p-6 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)]">
        {collections.map((collection, index) => (
          <>
            <li key={index} className="space-y-2 text-[#213271]">
              <h3 className="font-bold italic">{collection.companyName}</h3>
              <address className="space-y-2 text-sm font-extralight not-italic">
                <p>
                  {collection.info.address[0].street},{' '}
                  {collection.info.address[0].number} -{' '}
                  {collection.info.address[0].city} -{' '}
                  {collection.info.address[0].state} -{' '}
                  {collection.info.address[0].country}
                </p>
                <p>{formatToViewPhone(collection.info.phone[0].number)}</p>
              </address>
            </li>

            {index < collections.length - 1 && (
              <hr className="h-1 w-full rounded-full bg-[#21327122]" />
            )}
          </>
        ))}
      </ul>
      <iframe
        src={googleMapsUrl}
        width="850"
        height="734"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[46rem] w-full"
        title="Mapa do Google"
      />
    </div>
  )
}
