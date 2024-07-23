import FaqItem from './FaqItem'

export default function FaqHtml({ faq }) {
  return (
    <div className="my-6 flex w-full flex-col gap-5 md:flex-row md:gap-10">
      <div className="flex w-full flex-col gap-5 text-justify">
        {faq?.items.map(
          (item, fId) =>
            !!(fId % 2 === 0) && (
              <FaqItem key={fId} fId={fId} item={item} colors={faq.colors} />
            ),
        )}
      </div>
      <div className="flex w-full flex-col gap-5 text-justify">
        {faq?.items.map(
          (item, fId) =>
            !!(fId % 2 !== 0) && (
              <FaqItem key={fId} fId={fId} item={item} colors={faq.colors} />
            ),
        )}
      </div>
    </div>
  )
}
