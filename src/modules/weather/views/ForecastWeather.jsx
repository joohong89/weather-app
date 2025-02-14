import {Link, useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {WeatherService} from "../../../services/WeatherService.js";
import { BarChart } from '@mui/x-charts/BarChart';
import {DateTime} from "luxon";
import {CONSTANTS} from "../../../constants/Constants.js";
import {useToast} from "../../../context/ToastContext.jsx";

const ForecastWeather = () => {
    const{lat, lon} = useParams();
    const [rain, setRain] = useState([]);
    const [cityName, setCityName] = useState('');
    const chartSetting = {
        width: 600,
        height: 300,
    };
    const showToast = useToast();

    const valueFormatter = (value) => {
        let dt = DateTime.fromSeconds(value)
        return `${dt.toFormat(CONSTANTS.DD_LLL)} \n ${dt.toFormat(CONSTANTS.HH_MM)}`;
    }

    const fetchForecastWeather = useCallback(async() => {
        try {
            let res = await WeatherService.getForecast(lat, lon);

            let rain = res?.list.map(item => ({
                dt: item.dt,
                rain: item.rain?.['3h'] ?? 0,
                wind: item.wind?.speed ?? 0
            }));

            setRain(rain);
            setCityName(res?.city?.name);
        } catch (e) {
            showToast(e, CONSTANTS.DANGER)
        }
    }, [lat, lon, showToast]);


    useEffect(() => {
        fetchForecastWeather()
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center content-wrapper flex-column ">
                <div>
                    <h5>Forecast for {cityName}</h5>
                    <span>The following metrics shows weather forecast for the next 3 days. Interval is set at 3 hours.</span>
                </div>
                <BarChart
                    className="custom-chart m-auto w-100 mt-3"
                    dataset={rain}
                    width={500}
                    height={300}
                    series={[
                        { dataKey: 'rain', label: 'Rainfall', stack: 'stack1', color: CONSTANTS.CHART_COLOR },
                    ]}
                    xAxis={[{  scaleType: 'band', dataKey: 'dt', valueFormatter: valueFormatter}]}
                    {...chartSetting}
                />

                <BarChart
                    className="custom-chart m-auto w-100 mt-3"
                    dataset={rain}
                    width={500}
                    height={300}
                    series={[
                        { dataKey: 'wind', label: 'Wind', stack: 'stack1', color: CONSTANTS.CHART_COLOR },
                    ]}
                    xAxis={[{  scaleType: 'band', dataKey: 'dt', valueFormatter: valueFormatter}]}
                    {...chartSetting}
                />
            </div>
            <div className="text-center mt-3">
                <Link to='/' className="btn btn-primary m-auto">Back</Link>
            </div>

        </>

    )
}
export default ForecastWeather
