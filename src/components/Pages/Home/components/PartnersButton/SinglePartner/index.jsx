import Image from 'next/image';

const SinglePartner = ({ partner }) => {

  return (
    <div className=" group  duration-500 bg-[#22326e]  shadow-md py-4 group rounded-md overflow-hidden flex   items-center justify-center">
      <div className="relative md:border-4 bg-[#AF231C]   border-[#AF231C] rounded-full md:w-32 md:h-32 w-24 h-24 ">

        <Image
          src={partner.image}
          alt={'teste'}
          width={200}
          quality={100}
          height={200}
          className=" p-4 m-auto group-hover:scale-105 duration-500"
          />
      </div>
      <div className="p-4 flex flex-col justify-between items-start w-[200px]">
        <div>
          <h2 className="text-2xl font-bold text-white">{partner.title}</h2>
        </div>
        <div className="mt-4">
          <a
            href={partner.link}
            className="inline-block px-4 py-2  bg-white border-2 border-white  font-semibold text-[#222b4e] text-center rounded-md hover:bg-[#222b4e] hover:border-white hover:text-white transition-colors duration-500"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default SinglePartner;
