import axios from "axios";

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

const axiosInstance = axios.create({
    timeout: 8000, // 8 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    response => response,
    error => {
        if (!error.response) {
            throw new ApiError(503, "No response from server. Please check your connection.");
        }

        const status = error.response.status;
        const message = error.response.data?.message;

        switch (status) {
            case 400:
                throw new ApiError(status, "Bad request. Please check your input.");
            case 401:
                throw new ApiError(status, "Unauthorized. Please check your API key.");
            case 403:
                throw new ApiError(status, "Forbidden. You do not have access.");
            case 404:
                throw new ApiError(status, "Resource not found.");
            case 429:
                throw new ApiError(status, "Too many requests. Slow down and try again later.");
            case 500:
                throw new ApiError(status, "Server error. Try again later.");
            default:
                throw new ApiError(status, message || "An unexpected error occurred.");
        }
    }
);

export { axiosInstance, ApiError };