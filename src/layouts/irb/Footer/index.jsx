import Image from 'next/image'
import RenderList from './components/RenderList';

import { useContext } from 'react';
import { PageData } from '@/context/pageData';

import SocialMidia from './components/SocialMidia';


export default function Footer() {
  const { layouts } = useContext(PageData);
  const dataFooter = layouts.footer
  const colors = layouts.footer.colors

  return (
    <footer
    style={{background:colors.bg, color:colors.text}} 
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
         <RenderList list={dataFooter.lists}/>

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
              <li className='font-light md:text-start text-center md:text-lg text-base'>{dataFooter.address}</li>
              <li className='mb-3 mt-4'>
                <Image
                src='/images/footer/certificado-iso.svg'
                alt="logo"
                width={180}
                height={110}
              />
              </li>
            </ul>
            
            <SocialMidia/>

          </div>
      </div>
    </footer>
  )
}
