import React from 'react'

export default function ButtonCta({button, className}) {
  return (
    <section className={`relative flex flex-col items-center ${className}`} id="blog-carousel">
        <div className="w-full relative md:max-w-7xl md:px-14 mt-4 px-6 flex max-w-lg flex-wrap">
        <div className="mt-4 flex">
            <a
                target={button?.target && button?.target}
                href={button?.url}
                className="inline-block px-8 py-2 w-72 text-center bg-[#22326E] text-white font-semibold rounded hover:bg-[#3b4d8c] transition-colors duration-300"
                title={button?.title}
            >
                {button?.title}
            </a>
    </div>
    </div>
    </section>
  )
}
