import axios from 'axios';
import {CONSTANTS} from "../constants/Constants.js";

const API_END_POINT = import.meta.env.VITE_API_END_POINT;
const API_KEY = import.meta.env.VITE_API_KEY;

export const WeatherService = {
    getWeather: async (lat,lon) => {
        const params = {
            lat,
            lon,
            appid: API_KEY,
            units: CONSTANTS.METRIC
        };

        try {
            const response =  await axios.get(`${API_END_POINT}/data/2.5/weather`, {params: params});

            if (response.status !== CONSTANTS.HTTP_OK) {
                throw new Error(`Weather API returned an error: ${response.status} - ${response.statusText}`);
            }

            return response.data || undefined;
        } catch (error) {
            console.error("Weather error:", error);
            // catch locally thrown message from try above
            if (error.response) {
                throw new Error(`Weather failed: ${error.response.status} - ${error.response.data?.message || error.message}`);
            }
            throw new Error(`Weather failed: ${error.message}`);
        }
    }
}