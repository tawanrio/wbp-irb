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
                className='absolute w-full '>
                    <MenuHome content={content}/>
                </header>
            ):(
                <header>
                    <Menu content={content}/>
                </header>
            )}
        </>
    )
}

