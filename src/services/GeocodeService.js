import axios from 'axios';
import {CONFIG} from "../configs/Config.js";
import {CONSTANTS} from "../constants/Constants.js";

const API_END_POINT = import.meta.env.VITE_API_END_POINT;
const API_KEY = import.meta.env.VITE_API_KEY;

export const GeocodeService = {
    getGeocode: async (name) => {
        const params = {
            q: name,
            appid: API_KEY,
            limit: CONFIG.QUERY_LIMIT
        };

        try {
            const response =  await axios.get(`${API_END_POINT}/geo/1.0/direct`, {params: params});

            if (response.status !== CONSTANTS.HTTP_OK) {
                throw new Error(`Geocoding API returned an error: ${response.status} - ${response.statusText}`);
            }

            return response.data || undefined;
        } catch (error) {
            console.error("Geocoding error:", error);
            // catch locally thrown message from try above
            if (error.response) {
                throw new Error(`Geocoding failed: ${error.response.status} - ${error.response.data?.message || error.message}`);
            }
            throw new Error(`Geocoding failed: ${error.message}`);
        }
    }
}