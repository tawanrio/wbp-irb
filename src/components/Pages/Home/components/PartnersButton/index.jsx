import { cn } from '@/utils/cn'
import { SinglePartner } from './SinglePartner'
import { PARTNER_TYPES, PARTNER_TYPES_NO_MECHANICS } from '@/utils/constants'

const PartnersButton = ({ noMechanics, className }) => {
  return (
    <section
      id="blog-carousel"
      className={cn(
        'relative mx-auto flex w-full max-w-lg flex-col px-6 pt-14 md:max-w-7xl md:px-14',
        className,
      )}
    >
      {noMechanics ? (
        <ul className="mx-auto my-5 grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:gap-24 lg:grid-cols-2">
          {PARTNER_TYPES_NO_MECHANICS.map((partner, index) => (
            <SinglePartner key={index} partner={partner} />
          ))}
        </ul>
      ) : (
        <ul className="mx-auto my-5 grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:gap-24 lg:grid-cols-3">
          {PARTNER_TYPES.map((partner, index) => (
            <SinglePartner key={index} partner={partner} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default PartnersButton
