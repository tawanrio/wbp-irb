export default function Maps({location}) {
    console.log(location);
  return (
    <div className="h-full">
        <iframe src={location} width="400" height="200"  loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="w-full min-h-[270px]"></iframe>
    </div>
  )
}