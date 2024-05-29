import SectionTitle from '@/components/SectionTitle';
import SinglePartner from './SinglePartner';

const PartnersButton = ({ partners, title }) => {
    const partnerTypes = [ 
        {
            image: "/images/components/icons/autoparts2-white.png",
            title: "Autopeças",
            link: "/autopecas"
        },
        {
            image: "/images/components/icons/distributors-white.png",
            title: "Distribuidoras",
            link: "/distribuidoras"
        },
        {
            image: "/images/components/icons/mechanic-white.png",
            title: "Mecânicas",
            link: "/mecanicas"
        },

    ]
  return (
    <section className="relative flex flex-col items-center mt-14" id="blog-carousel">
    <div className="w-full relative md:max-w-7xl flex-col md:px-14 md:mb-0 my-4 px-6 flex max-w-lg">
   <SectionTitle title={"Nossa Linha De Produtos"} line/>
    <div className="container mx-auto py-10 my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {partnerTypes.map((partner, i) => (
            <SinglePartner key={i} partner={partner} />
        ))}
      </div>
    </div>
    </div>
    </section>
  );
};

export default PartnersButton;
