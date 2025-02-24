import SearchCity from "../components/SearchCity.jsx";
import {Col, Row} from "react-bootstrap";
import DisplayCurrentWeather from "../components/DisplayCurrentWeather.jsx";
import {useCallback, useState} from "react";
import {WeatherService} from "../../../services/WeatherService.js";
import {Utils} from "../../../utils/Utils.jsx";
import SearchHistoryService from "../../../services/SearchHistoryService.js";
import SearchHistory from "../components/SearchHistory.jsx";
import {useToast} from "../../../context/ToastContext.jsx";
import {CONSTANTS} from "../../../constants/Constants.js";

const CurrentWeather = () => {
    const showToast = useToast();
    const [selectedCity, setSelectedCity] = useState('');
    const [weatherInformation, setWeatherInformation] = useState();
    const [createdDateTime, setCreatedDateTime] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const cityChange = useCallback(async (value) => {
        setSelectedCity(value);

        try {
            setIsLoading(true);
            let res = await WeatherService.getWeather(value.lat, value.lon);
            setWeatherInformation(res)

        } catch(error) {
            showToast(error.message, CONSTANTS.DANGER);
        } finally {
            const timestamp = new Date().getTime();
            SearchHistoryService.addSearch({timestamp, value});
            setCreatedDateTime(timestamp);
            setIsLoading(false);
        }
    },[showToast]);

    const handleSearchFromHistory = (value) => {
        cityChange(value)
    }

    return (
        <>
            <div className="current-weather-city-search">
                <SearchCity onCityChange={cityChange} isParentLoading={isLoading}></SearchCity>
            </div>

            {selectedCity && <div className="selected-items mb-2">Showing: {selectedCity && Utils.formatLocation(selectedCity.name, selectedCity.state, selectedCity.country)} </div>}
            <Row className="justify-content-center content-wrapper" >
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
