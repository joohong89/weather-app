import {createContext, useCallback, useContext, useState} from 'react'
import {Toast, ToastContainer} from "react-bootstrap";
import PropTypes from "prop-types";
import {CONSTANTS} from "../constants/Constants.js";
import {CONFIG} from "../configs/Config.js";

const ToastContext = createContext();

export const ToastProvider  = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    // Function to add a toast
    const addToast = useCallback((message, variant = CONSTANTS.SUCCESS, delay = CONFIG.TOAST_DELAY) => {
        const id = Date.now(); // Unique ID
        setToasts((prev) => [...prev, { id, message, variant, delay }]);

        // Auto-remove after delay
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, delay);
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <ToastContainer position="top-end" className="p-3">
                {toasts.map(({ id, message, variant }) => (
                    <Toast key={id} bg={variant} onClose={() => setToasts(toasts.filter((t) => t.id !== id))}>
                        <Toast.Body className="text-white">{message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    )
}

ToastProvider.PropTypes = {
    children: PropTypes.any
}



export const useToast = () => useContext(ToastContext);