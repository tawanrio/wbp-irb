export default function Maps({ googleMapsUrl }) {
  return (
    <iframe
      src={googleMapsUrl}
      width="400"
      height="400"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="min-h-[15rem] w-full"
      title="Mapa do Google"
    ></iframe>
  )
}
