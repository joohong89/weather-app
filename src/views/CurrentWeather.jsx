import SearchCity from "../components/SearchCity.jsx";
import {Col, Row} from "react-bootstrap";
import DisplayCurrentWeather from "../components/DisplayCurrentWeather.jsx";
import {useCallback, useState} from "react";
import {WeatherService} from "../services/WeatherService.js";
import {Utils} from "../Utils/Utils.jsx";
import SearchHistoryService from "../services/SearchHistoryService.js";
import SearchHistory from "../components/SearchHistory.jsx";
import {useToast} from "../context/ToastContext.jsx";

const CurrentWeather = () => {
    const showToast = useToast();
    const [selectedCity, setSelectedCity] = useState('');
    const [weatherInformation, setWeatherInformation] = useState();
    const [createdDateTime, setCreatedDateTime] = useState();

    const cityChange = useCallback(async (value) => {
        setSelectedCity(value);

        try {
            let res = await WeatherService.getWeather(value.lat, value.lon);
            setWeatherInformation(res)

        } catch(error) {
            showToast(error.message, 'danger');
        } finally {
            const timestamp = new Date().getTime();
            SearchHistoryService.addSearch({timestamp, value})
            setCreatedDateTime(timestamp)
        }
    },[showToast]);

    const handleSearchFromHistory = (value) => {
        cityChange(value)
    }

    return (
        <>
            <SearchCity onCityChange={cityChange}></SearchCity>
            {selectedCity && <div className="selected-items mb-2">Showing: {selectedCity && Utils.formatLocation(selectedCity.name, selectedCity.state, selectedCity.country)} </div>}
            <Row className="justify-content-center weather-search-wrapper" >
                <Col xs="12">
                    <DisplayCurrentWeather createdDatetime={createdDateTime} cityInformation={selectedCity} weatherInformation={weatherInformation}></DisplayCurrentWeather>
                </Col>

                <Col xs="12" className="mt-4">
                    <SearchHistory createdDateTime={createdDateTime} onSearchFromHistory={handleSearchFromHistory}></SearchHistory>
                </Col>
            </Row>
        </>
    )
}
export default CurrentWeather
