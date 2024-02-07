import SectionTitle from "../SectionTitle"
import FilterPartners from "./components/FilterPartners";
import Collections from "./components/Collections";

export default function SearchPartners({partnerType,collections, products, arrRoute, hiddenProductSearch, title}) {
  return (
    <article className="flex flex-col items-center " id={`content-img-description_`}>
      <div className="w-full max-w-7xl md:px-14 px-6 md:my-10 my-4 flex flex-col md:justify-between md:gap-10">
      {title && (<SectionTitle title={title} line  />)}
      {(collections.length > 0) ? (
      <Collections collections={collections} products={products} arrRoute={arrRoute} hiddenProductSearch={hiddenProductSearch}/>
      ):(
        <h2 className="text-xl mb-[-25px]">Nenhum {partnerType} Encontrado </h2>
      )
      }
      </div>
    </article>
  )
}
