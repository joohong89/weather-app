import {CONSTANTS} from "../constants/Constants.js";
import {ApiError, axiosInstance} from "./APIClient.js";

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
            const response =  await axiosInstance.get(`${API_END_POINT}/data/2.5/weather`, {params: params});

            return response.data || undefined;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error; // Rethrow custom API error
            }
            throw new Error(`Weather failed: ${error.message}`);
        }
    },
    getForecast: async (lat,lon) => {
        const params = {
            lat,
            lon,
            appid: API_KEY,
            units: CONSTANTS.METRIC
        };

        try {
            const response =  await axiosInstance.get(`${API_END_POINT}/data/2.5/forecast/`, {params: params});

            return response.data || undefined;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error; // Rethrow custom API error
            }
            throw new Error(`Forecast failed: ${error.message}`);
        }
    }
}