import Icon from './components/Icon'
import Maps from './components/Maps'

export default function Address({ address }) {
  const googleMaps = address.maps.find((map) => map.label === 'google')

  const fulladdress = `${address.street}, ${address.city}, ${address.state}`
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(fulladdress)}&output=embed`
  googleMaps.route = googleMapsUrl.split('&')[0]

  return (
    <div className="flex flex-col items-center" id="address">
      <div className="flex w-full max-w-7xl flex-col justify-between md:gap-10">
        <div className="flex items-center gap-10">
          <span className="first-letter:ca w-full text-sm md:text-base">
            {address.street}, {address.number} - {address.city} -{' '}
            {address.state} - {address.country}
          </span>
          <div className="my-3 mt-1 flex translate-x-[-15px] gap-4 md:mr-20">
            <Icon icon={googleMaps} />
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col">
          <Maps googleMapsUrl={googleMapsUrl} />
        </div>
      </div>
    </div>
  )
}
