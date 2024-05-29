import Image from 'next/image';

const SinglePartner = ({ partner }) => {

  return (
    <div className="bg-white group hover:bg-slate-50 duration-500  shadow-md py-4 group rounded-md overflow-hidden flex   items-center justify-center">
      <div className="relative border-4 group-hover:bg-white   border-[#000] rounded-full w-32 h-32  ">

        <Image
          src={partner.image}
          alt={'teste'}
          width={200}
          quality={100}
          height={200}
          className=" p-4 m-auto group-hover:scale-105 duration-500"
          />
      </div>
      <div className="p-4 flex flex-col justify-between items-start ">
        <div>
          <h2 className="text-2xl font-bold text-[#222]">{partner.title}</h2>
        </div>
        <div className="mt-4">
          <a
            href={partner.link}
            className="inline-block px-4 py-2  bg-[#22326e]  font-semibold text-white text-center rounded-md hover:bg-[#222b4e] hover:border-white hover:text-white transition-colors duration-500"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default SinglePartner;
