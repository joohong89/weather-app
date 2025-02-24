import {Image} from "react-bootstrap";
import {Utils} from "../../../utils/Utils.jsx";

const WeatherCard = ({weather, title, src}) => {
    return (
        <div className="weather-card w-100 d-flex">
            <div className="weather-card-image-wrapper">
                <Image className="w-100" src={src}></Image>
            </div>
            <div className="ms-3">
                <h3>{title}</h3>
                <h1 className="fw-bolder">{ Utils.roundToOneDecimal(weather.temp) }°</h1>
                <span>{weather.dt_txt}</span>
            </div>
        </div>
    )
}
export default WeatherCard
