import { RenderListItem } from './RenderListItem'

export default function RenderList({ nav, colors }) {
  return (
    <>
      {nav?.map((items, ulId) => (
        <li
          key={ulId}
          className="mb-6 flex-1 font-light md:mx-3 md:flex-1 md:first:ml-0"
        >
          <ul className="flex flex-col gap-2">
            {items?.links?.map((li, liId) => (
              <RenderListItem
                key={liId}
                liId={liId}
                content={li}
                colors={colors}
              />
            ))}
          </ul>
        </li>
      ))}
    </>
  )
}
