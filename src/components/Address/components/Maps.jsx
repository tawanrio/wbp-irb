export default function Maps({ googleMapsUrl }) {
  return (
    <div className="h-full">
      <iframe
        src={googleMapsUrl}
        width="400"
        height="400"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="min-h-[240px] w-full"
      ></iframe>
    </div>
  )
}
