export default function InsertTextHTML({ text, color, size, className }) {
  return (
    <>
      <span
        id={`insertTextHTML`}
        className={`flex flex-col text-justify text-base font-[400] md:text-lg ${className && className} `}
        style={{
          color: color || '#666',
          ...(size && { fontSize: size }),
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></span>
    </>
  )
}
