import { EmblaCarousel } from '../Carousel'

const OPTIONS = { loop: true }

export const ListProduct = ({ categories }) => {
  return (
    <section
      id="product-carousel"
      className="relative mx-auto mt-20 flex w-full max-w-lg flex-col px-6 sm:mt-28 md:max-w-[1600px] md:px-14"
    >
      <h2 className="mx-auto w-full max-w-[281px] rounded-full bg-[#982225] px-2.5 py-1.5 text-center text-lg font-normal text-white shadow-[inset_0px_6.21px_5.5px_rgba(0,0,0,0.5)]">
        Nossos Produtos
      </h2>
      <EmblaCarousel slides={categories.slice(0, 6)} options={OPTIONS} />
    </section>
  )
}
