import {CONFIG} from "../configs/Config.js";
import {ApiError, axiosInstance} from "./APIClient.js";

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
            const response =  await axiosInstance.get(`${API_END_POINT}/geo/1.0/direct`, {params: params});

            return response.data || undefined;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new Error(`Geocoding failed: ${error.message}`);
        }
    }
}