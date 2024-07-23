import React from 'react'

export default function ButtonCta({ button, className }) {
  return (
    <section
      className={`relative flex flex-col items-center ${className}`}
      id="blog-carousel"
    >
      <div className="relative mt-4 flex w-full max-w-lg flex-wrap px-6 md:max-w-7xl md:px-14">
        <div className="mt-4 flex">
          <a
            target={button?.target && button?.target}
            href={button?.url}
            className="inline-block w-72 rounded bg-[#22326E] px-8 py-2 text-center font-semibold text-white transition-colors duration-300 hover:bg-[#3b4d8c]"
            title={button?.title}
          >
            {button?.title}
          </a>
        </div>
      </div>
    </section>
  )
}
