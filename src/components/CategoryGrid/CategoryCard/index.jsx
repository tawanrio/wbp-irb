import Image from 'next/image'

const CategoryCard = ({ category }) => {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={category.thumbnail.imageUrl}
          alt={category.thumbnail.alt}
          fill
          className="rounded-t-md object-contain"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-4">
        <div>
          <h2 className="text-2xl font-bold text-[#c12025]">
            {category.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-[#666]">
            {category.contentDescription[0]}
          </p>
        </div>
        <div className="mt-4">
          <a
            href={category.label}
            className="inline-block rounded-md bg-[#22326e] px-4 py-2 text-center text-white transition-colors duration-300 hover:bg-blue-700"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
