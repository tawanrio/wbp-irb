import React from 'react'
import Menu from "./Menu";
import MenuHome from "./MenuHome";


export default function Header({style, content, page}) {
    const size = page?.banners.size.height
    return (
       <>
            {!!style ? (
                <header 
                style={{ height: size}}
                className='absolute w-full md:py-0 my-10 '>
                    <MenuHome content={content}/>
                </header>
            ):(
                <header
                className='md:my-0 my-5 '
                >
                    <Menu content={content}/>
                </header>
            )}
        </>
    )
}

