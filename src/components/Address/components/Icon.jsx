import Image from "next/image";
import Link from "next/link";

export default function icon({icon}) {
  return (
   <Link href={icon?.route}
   target="_blank"
   className="
   hover:scale-105
   duration-500
   relative
   w-14
   h-14
   ">
   <Image
    src={icon?.icon}
    alt={icon?.alt}
   sizes="100vw"
   fill
    />
   </Link>
  )
}