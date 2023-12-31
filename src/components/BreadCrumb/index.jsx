import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

import { useContext } from 'react';
import { PageData } from '@/context/pageData';

export default function BreadCrumb() {

    const router = useRouter()
    const { icons } = useContext(PageData);

    let url = router.asPath.replace('/', '').split('/')
    const [pathname, setPathname] = useState(url)

    const [hostname, setHostname] = useState(router.hostname || '')

    useEffect(() => {
        let url = router.asPath.split('/')
        setPathname(url)
    }, [router.asPath])

    return (
        <div className="flex flex-col items-center " id={`breadcrumb_`}>
            <div className="w-full max-w-7xl md:px-14 px-6 flex flex-col justify-between gap-16">
                <div className="
                md:text-xl
                text-xs
                uppercase
                flex
                gap-2
                animate-fadeOut
                md:gap-4
                
                ">
                    {pathname.map((page, index) => {
                        let currentPage = '';
                        for (let i = 0; i <= index; i++) {
                            currentPage += '/' + pathname[i];
                        }
                        const dynamicUrl = hostname + currentPage

                        return (
                            <div key={'p' + index} className="
                        flex
                        gap-2
                        md:gap-4
                        ">
                                <Link
                                    href={dynamicUrl}
                                    style={{ ...pathname.length - 1 === index && { fontWeight: '600' } }}
                                    className={`
                                    ${pathname.length - 1 === index && 'animate-bounce'}
                                    hover:underline
                                    hover:text-blue-800
                                    duration-500
                                    `}>
                                    {index === 0 ? (`home${page}`.replaceAll('-', ' ')) : (`${page.replaceAll('-', ' ')}`)}

                                </Link>
                                {pathname.length - 1 !== index && (
                                    <Image
                                        alt="icon separate link"
                                        src={icons.arrow}
                                        width={18}
                                        height={18}
                                        className="
                                        w-[10px]
                                        md:w-[18px]
                                rotate-[-90deg]
                                
                                "
                                    />
                                )}
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}