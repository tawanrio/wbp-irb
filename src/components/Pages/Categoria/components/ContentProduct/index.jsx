import Image from 'next/image'

export const ContentProduct = ({ category, technicalSheet }) => {
  const { descriptions, thumbnail, title, contentDescription } = category

  return (
    <article
      id="content-img-description_"
      className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 py-16 sm:py-36 lg:flex-row"
    >
      <div className="mx-auto h-fit w-full max-w-[536.93px] space-y-7 rounded-[33.13px] border border-solid border-[#FFFFFF30] bg-[#D9D9D915] p-8 shadow-[0px_6.02px_6.02px_rgba(0,0,0,0.25)]">
        <figure className="relative w-full">
          <Image
            src={thumbnail?.imageUrlPng}
            alt={thumbnail?.alt}
            width={484.12}
            height={484.12}
            className="h-full max-h-[484.12px] w-full max-w-[484.12px] object-cover"
          />
        </figure>

        <div className="flex flex-col gap-4">
          <h2 className="line-clamp-2 text-3xl font-extrabold text-white md:text-5xl">
            {title}
          </h2>
          <p className="line-clamp-3 w-full max-w-[461.49px] font-thin text-white md:text-lg">
            {contentDescription}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[647.59px] space-y-10">
        <p className="w-fit rounded-full bg-[#982225] px-6 py-1 font-extralight text-white shadow-[inset_0px_6.21px_5.5px_rgba(0,0,0,0.5)]">
          {technicalSheet}
        </p>

        <ul className="space-y-8">
          {descriptions.map((description, index) => (
            <li key={index} className="space-y-2 text-white">
              <h3 className="text-2xl font-black md:text-3xl">
                {description.title}
              </h3>
              <p className="font-extralight md:text-lg">
                {description.description}

                {description?.list?.length > 0 && (
                  <ul className="pl-12 pt-6">
                    {description.list.map((l, index) => (
                      <li key={index} className="list-disc">
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
