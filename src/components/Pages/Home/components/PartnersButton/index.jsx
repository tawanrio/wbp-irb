/* eslint-disable @typescript-eslint/no-unused-vars */
import SectionTitle from '@/components/SectionTitle'
import SinglePartner from './SinglePartner'

const PartnersButton = ({ partners, title }) => {
  const partnerTypes = [
    {
      image: '/images/components/icons/autoparts2-white.png',
      title: 'Autopeças',
      link: '/autopecas',
    },
    {
      image: '/images/components/icons/distributors-white.png',
      title: 'Distribuidoras',
      link: '/distribuidoras',
    },
    {
      image: '/images/components/icons/mechanic-white.png',
      title: 'Mecânicas',
      link: '/mecanicas',
    },
  ]
  return (
    <section
      className="relative mt-14 flex flex-col items-center"
      id="blog-carousel"
    >
      <div className="relative my-4 flex w-full max-w-lg flex-col px-6 md:mb-0 md:max-w-7xl md:px-14">
        <SectionTitle title={'Parceiros IRB'} line />
        <div className="container mx-auto my-5 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partnerTypes.map((partner, i) => (
              <SinglePartner key={i} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersButton
