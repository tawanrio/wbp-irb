/* eslint-disable prettier/prettier */
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useIntl } from 'react-intl'
import {
  formatToViewPhone,
  formatStrToUrl,
  generateProductUrl,
  getGoogleMaps,
} from '@/utils/functions'

export const Maps = ({ googleMapsUrl, collections, contact }) => {
  const [selectedMapUrl, setSelectedMapUrl] = useState(googleMapsUrl)

  const intl = useIntl()
  const messages = intl.messages

  const route = useRouter()
  const baseUrl = route.asPath.split('/')

  const handleAddressClick = (address) => {
    const formattedAddress = `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.country}${address.zipcode ? `, ${address.zipcode}` : ''
      }`

    const googleMapsSearchUrl = getGoogleMaps(formattedAddress)
    setSelectedMapUrl(googleMapsSearchUrl)
  }

  return (
    <div className="relative flex flex-col md:flex-row">
      <ul className="max-h-[28rem] w-full space-y-4 overflow-y-auto rounded-t-[19.51px] bg-white p-6 shadow-[0px_3.55px_3.55px_rgba(0,0,0,0.25)] md:max-h-[46rem] md:max-w-[348px] md:rounded-l-[19.51px] md:rounded-r-none">
        {collections.map((collection, index) => {
          const collectionUrl = generateProductUrl(
            baseUrl,
            formatStrToUrl(collection.tradingName),
          )

          return contact ? (
            <li
              key={index}
              className="space-y-4"
              onClick={() => handleAddressClick(collection.info.address[0])}
            >
              <div className="space-y-2 cursor-pointer text-[#213271]">
                <h2 className="flex flex-row gap-1 font-bold italic">
                  <Image
                    src={collection.country}
                    alt={collection.info.address[0].country}
                    width={25}
                    height={25}
                  />
                  - {collection.companyName}
                </h2>
                <address className="space-y-2 text-sm font-extralight not-italic">
                  <p>
                    {collection.info.address[0].street},{' '}
                    {collection.info.address[0].number} -{' '}
                    {collection.info.address[0].city} -{' '}
                    {collection.info.address[0].state} -{' '}
                    {collection.info.address[0].country}
                  </p>
                  {collection.info.address[0]?.zipcode && (
                    <p>
                      {messages['component.address.input.cep']}:{' '}
                      {collection.info.address[0].zipcode}
                    </p>
                  )}
                </address>
              </div>

              {index < collections.length - 1 && (
                <hr className="h-1 w-full rounded-full bg-[#21327122]" />
              )}
            </li>
          ) : (
            <li key={index}>
              <Link href={collectionUrl} className="space-y-4">
                <div className="space-y-2 text-[#213271]">
                  <h2 className="flex flex-row gap-1 font-bold italic">
                    {collection.companyName}
                  </h2>
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
                </div>

                {index < collections.length - 1 && (
                  <hr className="h-1 w-full rounded-full bg-[#21327122]" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
      <iframe
        src={selectedMapUrl}
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
