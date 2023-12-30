import Image from "next/image";
import Link from "next/link";

export default function icon({icon}) {
  return (
   <Link href={icon?.route}
   className="
   dropShadown
   hover:scale-105
   duration-500
   ">
   <Image
    src={icon?.url}
    alt={icon?.alt}
    width={120 }
    height={120}
    />
   </Link>
  )
}