import Image from 'next/image'

const SingleUtility = ({ utilities }) => {
  return (
    <div className="flex h-[500px] flex-col items-start justify-between overflow-hidden rounded-md bg-white shadow-md">
      <div>
        <div className="relative h-[270px] w-full">
          <Image
            src={utilities.image}
            alt={utilities.title}
            fill
            className="rounded-t-md object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold text-[#222]">
              {utilities.title}
            </h2>
            <p className="line-clamp-3 text-[#222]">{utilities.description}</p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <a
          href={utilities.link}
          className="inline-block rounded-md text-center font-semibold text-black transition-colors duration-500"
        >
          Saiba mais
        </a>
      </div>
    </div>
  )
}

export default SingleUtility
