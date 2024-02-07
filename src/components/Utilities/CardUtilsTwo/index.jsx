import Image from "next/image";
import Link from "next/link";

export default function CardUtilsTwo({content}) {
  return (
    <div
      className="
    flex
    flex-1
    flex-col
    md:min-w-[45%]
    min-w-[40%]
    duration-500
    gap-4
    rounded-3xl
    min-h-[250px]
    items-center
    justify-center
  
    "
    >
      <h2 className="text-xl font-bold text-[#666] ">{content?.title}</h2>
      <div className="z-50 flex flex-col text-center items-center gap-4  text-[#666]">
        <span className="text-justify line-clamp-3 px-4">{content?.description}</span>
        
      </div>
      <div
        className="
    flex
      grayscale-[50%]
      flex-1
      min-w-[100%]
      py-10
      duration-500
      md:!min-h-[250px]
      relative
      rounded-3xl
      items-center
      
      hover:grayscale-[100%]
      justify-center
      overflow-hidden
      group
      before:content-['']
      before:block
      before:absolute
      before:bg-[#0a0a0aa3]
      before:z-[2]
      before:w-full
      before:h-full
      flex-col
    "
      >
        <Image
          fill
          sizes="100vw"
          src={content?.image}
          alt={"sda"}
          className="
    object-cover
    duration-700
    "
        />
      </div>
      <Link
          href={content?.link}
          className="
          cursor-pointer
          w-1/3
          duration-500
          text-center
          hover:scale-105
          hover:bg-[rgb(193, 32, 37)]
          py-2 
          rounded-3xl 
          border 
          text-[#666]
          border-[#666]
          "
        >
          {content?.linkText}
        </Link>
    </div>
  );
}
