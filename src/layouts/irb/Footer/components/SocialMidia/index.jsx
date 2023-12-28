import Image from 'next/image'
import { useContext } from 'react';
import { PageData } from '@/context/pageData';
import Link from 'next/link';

export default function SocialMidia() {

    const { layouts } = useContext(PageData);
    const dataSocialMidia = layouts.footer.socialMidia

    return (
        <>
            <ul >
                <li className="py-2 text-[.9rem] font-light capitalize">{dataSocialMidia.labelName}</li>

                <li className=" flex items-center">
                    {dataSocialMidia.networks.map((network, nId) => (
                            <Link key={nId} href={network.url} target='_blank'>
                            <Image
                                src={network.imageUrl}
                                alt={network.name}
                                width={30}
                                height={30}
                                className='mr-3'
                                />
                            </Link>
                    ))}
                </li>

            </ul>
        </>
    )
}