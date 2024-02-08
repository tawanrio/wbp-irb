
export default function Copyright() {


  //   const dataCopyright = layouts.copyright
  //   const colors = layouts.copyright.colors
    
  return (
    <>
        <section 
        style={{background:'white', color:'black'}}
        className={`
        text-[.8rem]
        flex
        justify-center
        md:py-10
        py-5
        `}>
                <span  className='text-center'>Copyright © 2024 - IRB Automotive. Todos os direitos reservados. | Desenvolvido por WBP </span>
        </section>
    </>
  )
}