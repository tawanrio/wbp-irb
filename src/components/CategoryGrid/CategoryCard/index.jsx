import Image from 'next/image';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col justify-between">
      <div className="relative w-full h-48">
        <Image
          src={category.thumbnail.imageUrl}
          alt={category.thumbnail.alt}
          layout="fill"
          objectFit="contain"
          className="rounded-t-md"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl font-bold text-[#666]">{category.title}</h2>
          <p className="text-[#666] mt-2 line-clamp-3">{category.contentDescription[0]}</p>
        </div>
        <div className="mt-4">
          <a
            href={category.label}
            className="inline-block px-4 py-2 bg-[#22326e] text-white text-center rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
