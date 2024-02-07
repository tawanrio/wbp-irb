import Button from "../Button";
import Icon from "./components/Icon";
import Maps from "./components/Maps";


export default function Address({ address }) {
    const wazeMaps = address.maps.find(map => map.label === 'waze')
    const googleMaps = address.maps.find(map => map.label === 'google')

    return (
        <div className="flex flex-col items-center " id="address">
            <div className="w-full max-w-7xl  flex flex-col justify-between md:gap-10">
                <div>
                    <div><h3 className="
                    md:text-2xl
                    text-lg
                    w-full 
                    uppercase
                    
                    font-bold
                    "
                    
                    >Ir Agora</h3></div>
                    <div className="flex gap-4 mt-1 my-3 md:mr-20 translate-x-[-15px]">
                        {/* <Button data={address?.button} /> */}

                        <Icon icon={googleMaps}/>
                        <Icon icon={wazeMaps}/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <Maps location={address?.location} />
                    </div>
                </div>
            </div>
        </div>

    )
}