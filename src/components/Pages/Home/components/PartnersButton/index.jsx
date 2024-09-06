import { SinglePartner } from './SinglePartner'
import { PARTNER_TYPES } from '@/utils/constants'

const PartnersButton = () => {
  return (
    <section
      id="blog-carousel"
      className="relative mx-auto mt-14 flex w-full max-w-lg flex-col px-6 md:mb-0 md:max-w-7xl md:px-14"
    >
      <ul className="mx-auto my-5 grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:gap-24 lg:grid-cols-3">
        {PARTNER_TYPES.map((partner, index) => (
          <SinglePartner key={index} partner={partner} />
        ))}
      </ul>
    </section>
  )
}

export default PartnersButton
