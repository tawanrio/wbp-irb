/* eslint-disable @typescript-eslint/no-unused-vars */
import SectionTitle from '@/components/SectionTitle'
import SinglePartner from './SinglePartner'

const PartnersButton = ({ partners }) => {
  console.log(partners)
  return (
    <section
      className="relative mt-14 flex flex-col items-center"
      id="blog-carousel"
    >
      <div className="relative my-4 flex w-full max-w-lg flex-col px-6 md:mb-0 md:max-w-7xl md:px-14">
        <SectionTitle title={partners.title} line />
        <div className="container mx-auto my-5 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partners.cards.map((partner, i) => (
              <SinglePartner key={i} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersButton
