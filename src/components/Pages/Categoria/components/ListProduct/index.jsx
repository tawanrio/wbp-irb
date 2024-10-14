import { useState } from 'react'
import { Product } from '../Product'

export const ListProduct = ({ products, thumbnail }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(products.length / postsPerPage)

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / 3) * 3
    return new Array(Math.min(3, totalPages - start))
      .fill()
      .map((_, idx) => start + idx + 1)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="flex max-w-7xl flex-col gap-10 px-5 pb-32 pt-12 sm:gap-16 sm:pt-16 md:mx-auto">
      <ul className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map((product, index) => (
          <li
            className="embla__slide max-sm:mx-auto max-sm:max-w-md"
            key={product._id || index}
          >
            <Product
              product={product}
              className="embla__slide__number"
              thumbnail={thumbnail}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        {currentPage > 3 && (
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-1 rounded bg-gray-200 px-3 py-1 text-gray-700"
            >
              &lt;
            </button>
          </div>
        )}
        {getPaginationGroup().map((pageNumber) => (
          <div key={pageNumber}>
            <button
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 rounded px-3 py-1 ${currentPage === pageNumber ? 'bg-[#22326E] text-white shadow-[0px_3.91px_3.91px_rgba(0,0,0,0.25)]' : 'bg-gray-200 text-gray-700'}`}
            >
              {pageNumber}
            </button>
          </div>
        ))}
        {currentPage < totalPages - 3 && (
          <div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-1 rounded bg-gray-200 px-3 py-1 text-gray-700"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
