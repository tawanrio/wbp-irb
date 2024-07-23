/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '../Button'
import Icon from './components/Icon'
import Maps from './components/Maps'

export default function Address({ address }) {
  const wazeMaps = address.maps.find((map) => map.label === 'waze')
  const googleMaps = address.maps.find((map) => map.label === 'google')

  const fulladdress = `${address.street}, ${address.city}, ${address.state}`
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(fulladdress)}&output=embed`
  googleMaps.route = googleMapsUrl.split('&')[0]

  return (
    <div className="flex flex-col items-center" id="address">
      <div className="flex w-full max-w-7xl flex-col justify-between md:gap-10">
        <div>
          <div className="flex items-center gap-10">
            <div>
              <span className="first-letter:ca w-full text-sm md:text-base">
                {address.street}, {address.number} - {address.city} -{' '}
                {address.state} - {address.country}
              </span>
            </div>
            {/* <div><h3 className="
                    md:text-xl
                    text-lg
                    w-full
                    mt-2
                    capitalize
                    text-[#666]
                    font-bold
                    "

                    >Ir Agora</h3></div> */}
            <div className="my-3 mt-1 flex translate-x-[-15px] gap-4 md:mr-20">
              {/* <Button data={address?.button} /> */}

              <Icon icon={googleMaps} />
              {/* <Icon icon={wazeMaps}/> */}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <Maps googleMapsUrl={googleMapsUrl} />
          </div>
        </div>
      </div>
    </div>
  )
}
