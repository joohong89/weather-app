import {useEffect, useState} from "react";
import {WeatherService} from "../../../services/WeatherService.js";
import {CONSTANTS} from "../../../constants/Constants.js";
import {useToast} from "../../../context/ToastContext.jsx";

const useWeather = (latitude, longitude) => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const showToast = useToast();

    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchWeather = () => {
            return Promise.all([
                WeatherService.getForecast(latitude, longitude),
                WeatherService.getWeather(latitude, longitude),
            ])}
            

        fetchWeather().then(([res, now]) => {
            let hottest, coldest;

            let rainArray = res?.list.map(item => {
                return {
                    dt: item.dt,
                    rain: item.rain?.['3h'] ?? 0
                }
            });

            let forecast = res?.list
                .filter((item, index) => index === 0 || (index ) % 8 === 0)
                .map((item) => {

                    let obj = {
                        ...item.main,
                        ...item.weather?.[0],
                        dt_txt: item.dt_txt,
                        dt: item.dt
                    };

                    if(!hottest || obj.temp > hottest.temp) {
                        hottest = {... obj}
                    }

                    if(!coldest || obj.temp < coldest.temp) {
                        coldest = {... obj}
                    }

                    return obj;
                });

            setWeatherInfo({
                info: res,
                currentWeather: now,
                rain: rainArray,
                weatherForecast: forecast,
                hottestWeather: hottest,
                coldestWeather: coldest,
            });
        }).catch((err) => {
            showToast(err, CONSTANTS.DANGER)
            setError("Error Loading Dashboard");
        }).finally(() => setLoading(false));
        
    }, [latitude, longitude, showToast]);

    return {weatherInfo, loading, error};
}

export default useWeather;