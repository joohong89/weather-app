import React from 'react'
import {Image} from "react-bootstrap";
import {Utils} from "../../../utils/Utils.jsx";

const SingleDayForecast = ({forecast}) => {

    const getImageName = (weatherCode) => {
        return weatherCode?.slice(0, -1);
    }

    const getDate =  (date) => {
        return date?.split(" ")?.[0]
    }

    return (
        <div className="d-flex flex-column align-items-center singleDayForecast">
            <Image className="w-100" src={`/images/${getImageName(forecast.icon)}.png`} />
            <h1 className="fw-bolder">{ Utils.roundToOneDecimal(forecast.temp) }°</h1>
            <h5>{getDate(forecast.dt_txt)}</h5>
            <span>{forecast.description}</span>
        </div>
    )
}
export default SingleDayForecast
