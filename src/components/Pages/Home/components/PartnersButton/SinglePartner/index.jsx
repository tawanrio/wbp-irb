import Image from 'next/image'

const SinglePartner = ({ partner }) => {
  return (
    <div className="group flex items-center justify-center overflow-hidden rounded-md bg-[#22326e] py-4 shadow-md duration-500">
      <div className="relative h-24 w-24 rounded-full border-[#AF231C] bg-[#AF231C] md:h-32 md:w-32 md:border-4">
        <Image
          src={partner.image}
          alt={'teste'}
          width={200}
          quality={100}
          height={200}
          className="m-auto p-4 duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex w-[200px] flex-col items-start justify-between p-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{partner.title}</h2>
        </div>
        <div className="mt-4">
          <a
            href={partner.link}
            className="inline-block rounded-md border-2 border-white bg-white px-4 py-2 text-center font-semibold text-[#222b4e] transition-colors duration-500 hover:border-white hover:bg-[#222b4e] hover:text-white"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  )
}

export default SinglePartner
