import {useEffect, useState} from "react";
import {useToast} from "../../../context/ToastContext.jsx";
import {CONSTANTS} from "../../../constants/Constants.js";
import {Col, Row, Spinner} from "react-bootstrap";
import FiveDayForecast from "../components/FiveDayForecast.jsx";
import {Utils} from "../../../utils/Utils.jsx";
import WeatherCard from "../components/WeatherCard.jsx";
import Chart from "../components/Chart.jsx";
import useWeather from "../hooks/useWeather.jsx";

const Dashboard = () => {
    const [coordinates, setCoordinates] = useState(null);
    const showToast = useToast();

    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    useEffect(() => {
        getCurrentLocation().then((position) => {
            setCoordinates( position.coords );
        }).catch((error) => showToast(error.message, CONSTANTS.DANGER));
    },[showToast])

    const { weatherInfo, loading, error } = useWeather(
        coordinates?.latitude,
        coordinates?.longitude
    );

    return (
        <>
            {  error ?
                <div>{error}</div> :
                <div>
                    {loading ?
                        <div className="my-5 text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner><br/>
                            <span className="mt-3">Dashboard loading...</span>
                        </div>
                        : <Row className="">
                            <Col xs={12} lg={3} className="d-flex flex-column">
                                <Row>
                                    <Col xs={12}>
                                        <div className="current-weather-card">
                                            <h3>{weatherInfo?.currentWeather?.name}</h3>
                                            <h1 className="title">{ Utils.roundToOneDecimal(weatherInfo?.currentWeather?.main?.temp)}°</h1>
                                            <h5>   {weatherInfo?.currentWeather?.weather?.[0].main}  </h5>
                                            <span>
                                        {weatherInfo?.currentWeather?.weather?.[0].description}
                                    </span>
                                        </div>
                                    </Col>

                                    <Col xs={12} sm={6} lg={12}>
                                        <div className="mt-4">
                                            <WeatherCard weather={weatherInfo?.hottestWeather} title={"Hottest Temperature"} src={"/public/images/hottest.png"} />
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={6} lg={12}>
                                        <div className="mt-4">
                                            <WeatherCard weather={weatherInfo?.coldestWeather} title={"Coldest Temperature"} src={"/public/images/coldest.png"} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} lg={6} className="mt-4 mt-lg-0">
                                <FiveDayForecast weatherForecast={weatherInfo?.weatherForecast} />
                            </Col>
                            <Col xs={12} lg={3} className="d-flex flex-column mt-4 mt-lg-0">
                                <div>
                                    <Chart title={"Gonna Rain"}
                                           description={"Shows amount of rainfall for three hours interval."}
                                           dataset={weatherInfo?.rain}
                                           dataKey={"rain"}
                                           label={"Rainfall"}
                                           chartType={"bar"}
                                           valueFormatter={Utils.valueFormatter}
                                           chartSetting={CONSTANTS.CHART_SETTINGS}
                                    ></Chart>
                                </div>

                                <div className="mt-4">
                                    <Chart title={"Temperature Trend"}
                                           description={"Shows the daily temperature trend for the next 5 days."}
                                           dataset={weatherInfo?.weatherForecast}
                                           dataKey={"temp"}
                                           label={"Temperature"}
                                           chartType={"line"}
                                           valueFormatter={Utils.valueFormatter}
                                           chartSetting={CONSTANTS.CHART_SETTINGS}
                                    ></Chart>
                                </div>
                            </Col>
                        </Row>}
                </div>
            }
        </>)
}
export default Dashboard
