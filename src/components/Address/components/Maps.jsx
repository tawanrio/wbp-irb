export default function Maps({googleMapsUrl}) {

  return (
    <div className="h-full">
        <iframe src={googleMapsUrl} width="400" height="400"  loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="w-full min-h-[240px]"></iframe>
    </div>
  )
}