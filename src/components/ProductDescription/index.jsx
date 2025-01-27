import Image from 'next/image'

export const ProductDescription = ({ product }) => {
  console.log(product)

  const {
    thumbnail,
    code,
    dimensions,
    type,
    vehicles,
    description,
    originalCode,
    referenceNumber,
  } = product || {}

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-start gap-8 overflow-hidden rounded-3xl border border-solid border-[#FFFFFF30] bg-[#D9D9D91A] p-7 md:max-w-4xl md:flex-row">
      <figure className="h-full max-h-[395.9px] max-w-full">
        <Image
          src={thumbnail?.url || '/default-image.png'} // Use uma imagem padrão se não houver thumbnail
          alt={thumbnail?.alt || 'Thumbnail do produto'}
          width={361.2}
          height={395.9}
          className="h-full max-h-[395.9px] w-full rounded-3xl text-white"
        />
      </figure>
      <div className="mt-2 flex w-full max-w-md flex-col gap-7 overflow-auto overflow-x-hidden">
        <h1 className="mb-1.5 line-clamp-2 text-2xl font-extrabold text-white max-sm:break-all sm:text-3xl">
          {code?.toUpperCase() || 'Código não disponível'}
        </h1>
        <div className="flex flex-col gap-1">
          {description && (
            <p className="line-clamp-4 font-thin text-white xl:text-lg">
              <b className="font-bold">Grupo: </b>
              <span className="capitalize">{description}</span>
            </p>
          )}
          {dimensions && (
            <p className="line-clamp-4 font-thin text-white xl:text-lg">
              <b className="font-bold">Medidas: </b>
              {dimensions}
            </p>
          )}
          {type && (
            <p className="line-clamp-4 font-thin text-white xl:text-lg">
              <b className="font-bold">Tipo: </b>
              <span className="capitalize">{type}</span>
            </p>
          )}
          {originalCode && originalCode.length > 0 && (
            <p className="line-clamp-4 font-thin text-white xl:text-lg">
              <b className="font-bold">Código Original: </b>
              {originalCode.join(' - ')}
            </p>
          )}
          {referenceNumber && referenceNumber.length > 0 && (
            <p className="line-clamp-4 font-thin text-white xl:text-lg">
              <b className="font-bold">Números Referência: </b>
              {referenceNumber.join(' - ')}
            </p>
          )}
          {vehicles?.length > 0 && (
            <>
              <p className="line-clamp-4 font-thin text-white xl:text-lg">
                <b className="font-bold">Montadoras: </b>
                {[
                  ...new Set(
                    vehicles.map((vehicle) =>
                      vehicle.manufacturer.toUpperCase(),
                    ),
                  ),
                ].join(' - ')}
              </p>
              <p className="line-clamp-4 font-thin text-white xl:text-lg">
                <b className="font-bold">Veículos: </b>
                <span className="capitalize">
                  {[
                    ...new Set(vehicles.map((vehicle) => vehicle.vehicle)),
                  ].join(' - ')}
                </span>
              </p>
              {vehicles.some((vehicle) => vehicle.position) && (
                <p className="line-clamp-4 font-thin text-white xl:text-lg">
                  <b className="font-bold">Posição: </b>
                  <span className="capitalize">
                    {[
                      ...new Set(vehicles.map((vehicle) => vehicle.position)),
                    ].join(' - ')}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
