import Image from 'next/image';

const BlogCard = ({ post }) => {
  const getUrlImage = (post) => {
    let urlImageDest = '/images/components/others/not-found.jpg';
    if(post?.yoast_head_json?.og_image){
      urlImageDest = post?.yoast_head_json.og_image[0]?.url;
    }
    return urlImageDest;
  }; 

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col justify-start items-start">
      <div className="relative w-full h-52">
        <img src={getUrlImage(post)} alt={post.image?.alt} className="object-cover w-full h-full" />
      </div>
      <div className="p-4 flex flex-col justify-between items-start flex-grow"> {/* Usando flex-grow para garantir que este div ocupe o espaço restante */}
        <div>
          <h2 className="text-xl font-semibold text-[#222] line-clamp-2 md:h-16 h-14">{post?.title.rendered}</h2>
          <p className="text-[#222] line-clamp-5 " dangerouslySetInnerHTML={{ __html: post?.excerpt.rendered}}></p>
        </div>
        <div>
          <a
            href={'blog/'+post.id}
            className="inline-block font-semibold text-black text-center rounded-md transition-colors duration-500"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
