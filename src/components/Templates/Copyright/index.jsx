export default function Copyright({content}) {

    const copyright = content?.items.find(item => item.label === 'default')
    const colors = copyright?.colors

  return (
    <>
        <section 
        style={{background:colors?.bg, color:colors?.text}}
        className={`
        text-[.8rem]
        flex
        justify-center
        md:py-10
        py-5
        `}>
                <span  className='text-center'>{copyright?.text} </span>
        </section>
    </>
  )
}