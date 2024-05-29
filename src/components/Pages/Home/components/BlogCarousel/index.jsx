import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import BlogCard from './BlogCard';

const BlogCarousel = ({posts}) => {
  const blogs = [
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 1",
      description: "Descrição breve do blog 1.",
      link: "/blog/1"
    },
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 2",
      description: "Descrição breve do blog 2.",
      link: "/blog/2"
    },
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 3",
      description: "Descrição breve do blog 3.",
      link: "/blog/3"
    },
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 4",
      description: "Descrição breve do blog 4.",
      link: "/blog/4"
    },
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 5",
      description: "Descrição breve do blog 5.",
      link: "/blog/5"
    },
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 6",
      description: "Descrição breve do blog 6.",
      link: "/blog/6"
    },
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 7",
      description: "Descrição breve do blog 7.",
      link: "/blog/7"
    },
    {
      image: "/images/partners/irbCode.jpeg",
      title: "Blog 8",
      description: "Descrição breve do blog 8.",
      link: "/blog/8"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 350; // Largura fixa do card
  const gap = 16; // Espaço entre os cards
  const visibleCards = 4; // Número de cards visíveis ao mesmo tempo

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0) {
        return posts.length - visibleCards;
      }
      return newIndex;
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= posts.length - visibleCards + 2) {
        return 0;
      }
      return newIndex;
    });
  };

  return (
    <section className="flex flex-col items-center" id="blog-carousel">
      <div className="w-full max-w-7xl md:px-14 md:my-7 my-4 px-6 flex flex-col justify-between md:gap-10">
        <SectionTitle title="Acompanhe nossas últimas postagens" line />

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out py-5"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
            }}
          >
            {posts.map((post, index) => (
              <div
                key={index}
                className="w-72 flex-shrink-0 hover:scale-105 duration-500 rounded-md overflow-hidden"
                style={{ width: `${cardWidth}px`, marginRight: `${gap}px` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          {posts.length > visibleCards && (
            <>
              <button
                onClick={prevSlide}
                className="absolute hover:bg-[#999] hover:opacity-100 opacity-70 duration-500 left-0 top-1/2 transform -translate-y-1/2 bg-[#22326e] text-white  p-3 shadow-md"
              >
                {'<'}
              </button>
              <button
                onClick={nextSlide}
                className="absolute hover:bg-[#999] hover:opacity-100 opacity-70 duration-500 right-0 top-1/2 transform -translate-y-1/2 bg-[#22326e] text-white  p-3 shadow-md"
              >
                {'>'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
