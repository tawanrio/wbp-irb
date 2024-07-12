import Image from 'next/image'
import RenderList from './components/RenderList';

import SocialMidia from './components/SocialMidia';


export default function Footer({content}) {

  const dataFooter = content?.items.find(item => item.label === 'default')
  const colors = dataFooter?.colors
  const certificates = dataFooter?.certificates

  console.log(certificates);

  return (
    <footer
    style={{background:colors?.bg, color:colors?.text}} 
    >
      <div className="
      md:max-w-7xl 
      mx-auto 
      md:px-14
      md:py-12
      
      py-6
      flex
      flex-wrap 
      md:justify-between 
      px-6
      gap-1
      ">
         <RenderList nav={dataFooter?.nav} colors={colors}/>

          <div className='
          md:mx-3
          md:last:mr-0
          md:w-max
          md:flex-1
          md:items-start
          flex
          flex-col
          items-center
          '>

          <ul className='list-ul flex flex-col md:items-start items-center'>
              <li className='font-light md:text-start text-center md:text-lg text-base'>{dataFooter?.address}</li>
              <li className='mb-3 mt-4'>
                <div className='flex'>
                {certificates?.map((certificate, index) => (
                  <Image
                  src={certificate?.url}
                  alt={certificate?.alt}
                  width={180}
                  height={110}
                  className='w-1/2'
                  key={index}
                  />
                ))}
                </div>
              </li>
            </ul>
            
            <SocialMidia content={dataFooter?.socialMidia}/>

          </div>
      </div>
    </footer>
  )
}
