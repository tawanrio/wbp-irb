import React from 'react'
import MenuHome from "./MenuHome";
import { useContext, useState } from 'react';
import { PageData } from '@/context/pageData';


export default function Header() {
    const { _home } = useContext(PageData);

    const size = _home.banners.size.height

    console.log(size);
    return (
        <header 
        style={{ height: size}}
        className='absolute w-full'>
            <MenuHome/>
        </header>
    )
}
