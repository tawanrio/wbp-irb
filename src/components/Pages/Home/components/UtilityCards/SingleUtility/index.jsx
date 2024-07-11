import Image from 'next/image';

const SingleUtility = ({ utilities }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden h-96 justify-between flex flex-col items-start">
      <div>
      <div className="relative w-full h-[200px]">
        <Image
          src={utilities.image}
          alt={utilities.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
        />
      </div>
      <div className="p-4 flex flex-col justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-[#222]">{utilities.title}</h2>
          <p className="text-[#222] line-clamp-3">{utilities.description}</p>
        </div>
      </div>
      </div>
        <div className='px-4'>
          <a
            href={utilities.link}
            className="inline-block font-semibold text-black text-center rounded-md transition-colors duration-500"
          >
            Saiba mais
          </a>
        </div>
    </div>
  );
};

export default SingleUtility;
