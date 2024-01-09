import { useContext } from 'react';
import { PageData } from '@/context/pageData';

export default function Copyright() {

  const { layouts } = useContext(PageData);
    const dataCopyright = layouts.copyright
    const colors = layouts.copyright.colors
    
  return (
    <>
        <section 
        style={{background:colors.bg, color:colors.text}}
        className={`
        text-[.8rem]
        flex
        justify-center
        md:py-10
        py-5
        `}>
                <span  className='text-center'>{dataCopyright.label} </span>
        </section>
    </>
  )
}