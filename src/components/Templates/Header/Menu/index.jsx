import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';

export default function MenuDesktop({content}) {
    const [isHovered, setIsHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    // const dataHeader = layouts.header
    // const colors = layouts.header.colors
    const dataHeader = content
    const colors = content?.colors

    function handleSubmenu(event,key, submenu){
        submenu && event.preventDefault();
        submenuOpen ? setSubmenuOpen(false) : setSubmenuOpen(key)
    }

    function handleMenu(){
        if(menuOpen){
            setMenuOpen(false)
            setSubmenuOpen(false)
        }else{
            setMenuOpen(true)
        }
    }

    return (
        <>
            <div className=' 
            md:w-full 
            justify-between 
            md:max-w-7xl 
            md:mx-auto 
            md:px-14
            md:min-h-[110px]
            relative
            flex
            items-center
            px-6
            '>
                <Link href={dataHeader.logo.route} className='w-20 md:w-36'>
                    <Image
                        src={dataHeader.logo.url}
                        alt={dataHeader.logo.alt}
                        width={130}
                        height={120}
                    />
                </Link>

                <div className='flex flex-col '>
                    <div className='md:hidden flex w-full cursor-pointer justify-end items-center gap-4 ' 
                    onClick={() => handleMenu()}>
                        <span className='text-xl font-semibold capitalize'>Menu</span>
                        <div className='relative w-5'>
                            <div 
                            style={{...menuOpen && {transform:'translateY(8px)', rotate:'45deg'},}}
                            className="bar w-full border-b-2 duration-500 z-20 border-black h-0 "></div>
                            <div 
                            style={{...menuOpen && {opacity:'0'}}}
                            className="bar w-full border-b-2 duration-200 my-1 z-20 border-black h-0 opacity-100"></div>
                            <div 
                            style={{...menuOpen && {transform:'translateY(-8px)', rotate:'-45deg'}}}
                            className="bar w-full border-b-2 duration-500 z-20 border-black h-0 "></div>
                        </div>
                    </div>
                <div style={{...menuOpen && {opacity:'1',zIndex:'10'}, background:colors.bg, color:colors.text ,}} className="
                    md:flex-row
                    md:items-center  
                    md:justify-center
                    md:relative
                    md:p-0
                    md:gap-0
                    md:opacity-100
                    md:z-50
                    md:w-full
                    md:mt-0
                    
                    !z-[999]
                    right-0
                    w-[65%]
                    opacity-0
                    duration-500
                    absolute
                    capitalize
                    p-4
                    pt-0
                    mt-10
                    flex-col
                ">
                    {dataHeader?.nav[0].links?.map((link, lId) => (
                        <ul key={'l'+lId} className="
                        md:w-auto
                        md:inline-block
                        group
                        w-full
                        z-50
                        uppercase
                        flex
                        flex-col
                        items-end
                      ">
                            <Link target={link?.blank} href={link.route || "/#"} key={link.label}
                              onMouseEnter={() => setIsHovered('l'+lId)}
                              onMouseLeave={() => {
                                
                                setIsHovered(false)}}
                              onClick={(event)=> handleSubmenu(event,'l'+lId, link.hasOwnProperty("submenu"))}
                                style={{ ...(isHovered && !link.hasOwnProperty("submenu")) && isHovered === 'l'+lId? {background:colors.hoverbg, color: colors.hovertext} : ''}}
                            className='
                            md:flex-row
                            md:text-base
                            px-4
                            py-2
                            justify-start
                            w-full
                            mx-1
                            duration-500
                            flex
                            font-medium
                            flex-row-reverse
                            gap-3
                            '
                            >
                                <span>{link.label}</span>
                                {link.hasOwnProperty("submenu") && ( <Image
                                                                        src={dataHeader.nav[0].icon}
                                                                        alt={dataHeader.logo.alt}
                                                                        width={15}
                                                                        height={15}
                                                                        style={{...(submenuOpen && submenuOpen === 'l'+lId) && {transform:'rotate(0deg)'}}}
                                                                        className='
                                                                        md:rotate-[-90deg]
                                                                        rotate-[90deg]
                                                                        
                                                                        duration-500
                                                                        md:group-hover:rotate-[0deg]
                                                                        '
                                                                    />)}
                            </Link>
                            {link.hasOwnProperty("submenu") && (
                                <div 
                                style={{...(submenuOpen && submenuOpen === 'l'+lId) && {display:'block'}, background:colors.bg, color:colors.text}}
                                className="
                                md:group-hover:block 
                                hidden 
                                md:absolute 
                                
                                md:py-2 
                                z-[99]
                                md:shadow-[0_10px_15px_-10px_rgba(0,0,0,.8)]
                                md:rounded-2xl	
                                md:overflow-hidden
                                text-sm
                                ">
                                    {link.submenu.map((submenu, sId) => (
                                        <ul key={submenu.label || 's'+sId}
                                        className='w-full'>
                                            <Link target={submenu?.blank} href={submenu.route || "/#"}
                                            onMouseEnter={() => setIsHovered('s'+sId)}
                                            onMouseLeave={() => setIsHovered(false)}
                                              style={{...isHovered && isHovered === 's'+sId? {background:colors.hoverbg, color: colors.hovertext} : ''}}
                                            className='
                                            md:text-start
                                            md:text-base
                                            w-full 
                                            py-1
                                            flex
                                            justify-end
                                            md:justify-start
                                            px-5
                                            text-end
                                            duration-500
                                            whitespace-nowrap
                                            
                                            '>
                                                {submenu.label || "Submenu Item"}
                                            </Link>
                                        </ul>
                                    ))}
                                </div>
                            )}
                        </ul>
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}