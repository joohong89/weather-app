import {Col, Image, Row} from "react-bootstrap";
import {Utils} from "../Utils/Utils.jsx";

const DisplayCurrentWeather = ({createdDatetime, cityInformation, weatherInformation}) => {

    const roundValue = (value) => {
        return Utils.roundToOneDecimal(value)
    }

    return (
       <>
           <div className="current-weather-wrapper">
               <div className="current-weather-image">
                   <Image src="/src/assets/sun.png" />
               </div>
               { weatherInformation ?
                   <>
                   <div className="current-weather-results d-flex">
                       <div className="current-weather-temperature w-50">
                           <span className="current-weather-temperature-header">Today&#39;s Weather</span>
                           <h1 className="current-weather-temperature-info">{weatherInformation? roundValue(weatherInformation.main.temp) : '-'}°</h1>
                           <span className="current-weather-temperature-footer">H: {weatherInformation? roundValue(weatherInformation.main.temp_max) : '-'}° L: {weatherInformation? roundValue(weatherInformation.main.temp_min) : '-'}°</span>
                           <span className="d-md-none d-block"> {cityInformation && Utils.formatStateAndCountry(cityInformation.state, cityInformation.country)} </span>
                       </div>
                   </div>
                   <div className="current-weather-information">
                       {weatherInformation &&
                           <Row className="justify-content-between w-100 flex-column-reverse flex-md-row">
                               <Col md="auto" className="d-none d-md-block"> {cityInformation && Utils.formatStateAndCountry(cityInformation.state, cityInformation.country)} </Col>
                               <Col md="auto"> {Utils.formatTimeStamp(createdDatetime)} </Col>
                               <Col md="auto"> Humidity: {weatherInformation? weatherInformation.main.humidity : '-'}% </Col>
                               <Col md="auto"> {weatherInformation? weatherInformation.weather.map((item, index) => <span key={index}>{item.main}</span>) : '-' } </Col>
                           </Row>
                       }
                   </div></> : <div className="current-weather-no-information">
                       Search to see weather information.
                   </div>

               }
           </div>
       </>
    )
}
export default DisplayCurrentWeather
