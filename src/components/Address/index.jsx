import Button from "../Button";
import Icon from "./components/Icon";
import Maps from "./components/Maps";


export default function Address({ address }) {

    return (
        <div className="flex flex-col items-center " id="address">
            <div className="w-full max-w-7xl  flex flex-col justify-between md:gap-10">
                <div>
                    <div className="flex gap-4 mb-4 md:mr-20">
                        <Button data={address?.button} />
                        <Icon icon={address?.icons.maps}/>
                        <Icon icon={address?.icons.waze}/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <Maps location={address?.location} />
                    </div>
                </div>
            </div>
        </div>

    )
}