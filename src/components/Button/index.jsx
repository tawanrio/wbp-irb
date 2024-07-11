import Image from "next/image"
import Link from "next/link"
import {formatPhoneNumber, formatToViewPhone} from "@/utils/functions"

export default function ButtonTell({phone, whatsapp}) {

  const formatedWhatsappNumber = whatsapp && formatToViewPhone(whatsapp?.number)
  const apiWhats = `https://api.whatsapp.com/send?phone=55${whatsapp?.number}`

  const formatedPhoneNumber = phone && formatToViewPhone(phone?.number)
  const actionPhone = `tel:+55${phone?.number}`
  return (
    <>
    {phone && (
    <Link href={actionPhone}
    target="_blank"
    style={{width: phone?.layout?.width, height: phone?.layout?.height, backgroundColor: phone?.layout?.colors.bg, border: phone?.layout?.border}}
    className=" px-5 py-3  rounded-2xl  bg-slate-800 flex flex-col justify-center
     
    ">
      <div className="flex  items-center relative">
        {phone?.icon &&( 
          <div className="relative w-10 h-10">
           <Image
              src={phone?.icon}
              alt={'Icone button'}
              sizes="100vw"
              fill
              className="
              duration-500
              "
          />
          </div>
        )}
        <span 
        style={{color: phone?.layout?.colors.text, fontWeight: phone?.layout?.weight }}
        className={`
        md:text-2xl
        text-lg
         ml-2
        text-center
        uppercase
        opacity-100
        
        ${phone?.number && ( 'group-hover:opacity-0 ' )}
        duration-500
        ${phone?.icon.url && 'ml-2'}
        `}>
          {(formatedPhoneNumber)}
          </span>
          {phone?.number && (
            <span 
              style={{color: phone?.layout?.colors.text, fontSize: phone?.layout?.size, fontWeight: phone?.layout?.weight }}
              className={`
              md:text-2xl
              scale-[.82]
              text-lg
              absolute 
              w-full 
              text-center
              uppercase
              opacity-0
              group-hover:opacity-100
              duration-700
              ${phone?.icon.url && 'ml-2'}
              `}>
               {(formatedPhoneNumber)}
            </span>
          )}
      </div>
    </Link>
    )}

    {whatsapp && (
      <Link href={apiWhats}
      target="_blank"
      style={{width: whatsapp?.layout?.width, height: whatsapp?.layout?.height, backgroundColor: '#72C971', border: '#ddd'}}
      className=" px-5 py-3  rounded-2xl  bg-slate-800 flex flex-col justify-center
       
      ">
        <div className="flex  items-center relative">
          {whatsapp?.icon &&( 
            <div className="relative w-10 h-10">
             <Image
                src={"/images/components/button/whatsapp.png"}
                alt={'Icone button'}
                sizes="100vw"
                fill
                className="
                duration-500
                "
            />
            </div>
          )}
          <span 
          style={{color: 'white', fontWeight: whatsapp?.layout?.weight }}
          className={`
          md:text-2xl
          text-lg
          ml-2
          text-center
          uppercase
          opacity-100
          
          ${whatsapp?.number && ( 'group-hover:opacity-0 ' )}
          duration-500
          ${whatsapp?.icon.url && 'ml-2'}
          `}>
            {formatedWhatsappNumber}
            </span>
            {whatsapp?.number && (
              <span 
                style={{color:"white", fontSize: whatsapp?.layout?.size, fontWeight: whatsapp?.layout?.weight }}
                className={`
                md:text-2xl
                scale-[.82]
                text-lg
                absolute 
                w-full 
                text-center
                uppercase
                opacity-0
                group-hover:opacity-100
                duration-700
                ${whatsapp?.icon.url && 'ml-2'}
                `}>
                  {formatedWhatsappNumber}
              </span>
            )}
        </div>
      </Link>
      )}
      </>
  )
}