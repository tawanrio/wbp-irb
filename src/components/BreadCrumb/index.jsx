/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function BreadCrumb() {
  const router = useRouter()

  const url = router.asPath.replace('/', '').split('/')
  const [pathname, setPathname] = useState(url)
  const [hostname, setHostname] = useState(router.hostname || '')

  useEffect(() => {
    const url = router.asPath.split('/')
    setPathname(url)
  }, [router.asPath])

  return (
    <div className="flex flex-col items-center" id={`breadcrumb_`}>
      <div className="flex w-full max-w-7xl flex-col justify-between gap-16 px-6 md:px-14">
        <div className="flex animate-fadeOut gap-2 overflow-auto text-xs uppercase md:mt-8 md:gap-4 md:text-base">
          {pathname.map((page, index) => {
            let currentPage = ''
            for (let i = 0; i <= index; i++) {
              currentPage += pathname[i] + '/'
            }
            const dynamicUrl = hostname + currentPage

            let pageName = page.replaceAll('-', ' ')
            if (pageName.includes('?')) {
              pageName = pageName.split('?')[0]
            }

            return (
              <div key={'p' + index} className="flex gap-2 md:gap-4">
                <Link
                  href={dynamicUrl}
                  style={{
                    ...(pathname.length - 1 === index && { fontWeight: '600' }),
                    ...{ color: '#666' },
                  }}
                  className={` ${pathname.length - 1 === index && ''} duration-500 hover:text-blue-800 hover:underline`}
                >
                  {index === 0 ? `home` : `${pageName}`}
                </Link>
                {pathname.length - 1 !== index && (
                  <Image
                    alt="icon separate link"
                    src={'/images/arrow.svg'}
                    width={12}
                    height={12}
                    className="w-[10px] rotate-[-90deg] md:w-3"
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
