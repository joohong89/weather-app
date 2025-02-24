import {ApiError, axiosInstance} from "./APIClient.js";

const API_END_POINT = import.meta.env.VITE_API_END_POINT;
const API_EKY = import.meta.env.VITE_API_KEY;

export const AlertService = {
    createAlert: async (startTime, endTime, threshold, lat, long) => {
        const params = {
            "time_period":{
                "start":{
                    "expression":"after",
                    "amount":startTime
                },
                "end":{
                    "expression":"after",
                    "amount":endTime
                }
            },
            "conditions":[
                {
                    "name":"temp",
                    "expression":"$gt",
                    "amount":threshold
                }
            ],
            "area":[
                {
                    "type":"Point",
                    "coordinates":[
                        lat,
                        long
                    ]
                }
            ],
            "appid": API_EKY
        }

        try {
            const response =  await axiosInstance.post(`${API_END_POINT}/data/3.0/triggers`, {params: params});

            return response.data || undefined;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new Error(`Alert Creation failed: ${error.message}`);
        }
    }
}