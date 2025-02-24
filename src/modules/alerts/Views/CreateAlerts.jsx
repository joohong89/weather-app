import SearchCity from "../../weather/components/SearchCity.jsx";
import Form from "react-bootstrap/Form";
import {useCallback, useState} from "react";
import {Button} from "react-bootstrap";
import {AlertService} from "../../../services/AlertService.js";
import {Utils} from "../../../utils/Utils.jsx";
import {useToast} from "../../../context/ToastContext.jsx";
import {CONSTANTS} from "../../../constants/Constants.js";

const CreateAlerts = () => {
    const showToast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isCityInvalid, setIsCityInvalid] = useState(false);
    const [cityInformation, setCityInformation] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [isEndDateInvalid, setIsEndDateInvalid] = useState(false);
    const [temperature, setTemperature] = useState(undefined);
    const [isTemperatureInvalid, setIsTemperatureInvalid] = useState(false);

    const onCityChange = (city) => {
        setCityInformation(city);
        setIsCityInvalid(false);
    }

    const dateChange = (callback, isInvalidCallback) => {
        return (date) =>  {
            isInvalidCallback(false);
            callback(date.target.valueAsNumber);}
    }

    const temperatureChange = (temp) => {
        setIsTemperatureInvalid(false)
        setTemperature(temp.target.value);
    }



    const submit = useCallback(
        async (e) => {
            e.preventDefault();

            const validateForm = () => {
                let hasError = false;

                // validation
                if(!cityInformation) {
                    showToast("Please select city before proceeding", CONSTANTS.DANGER);
                    setIsCityInvalid(true)
                    hasError = true
                }

                if(isNaN(temperature)) {
                    showToast("Please enter temperature correctly.", CONSTANTS.DANGER);
                    setIsTemperatureInvalid(true)
                    hasError = true
                }

                if(!startDate) {
                    showToast("Please set start date before proceeding", CONSTANTS.DANGER);
                    setIsStartDateInvalid(true)
                    hasError = true
                }

                if(!endDate) {
                    showToast("Please set end date before proceeding", CONSTANTS.DANGER);
                    setIsEndDateInvalid(true)
                    hasError = true
                } else if(endDate.valueOf() < startDate.valueOf()) {
                    showToast("End Date cannot be earlier that start date", CONSTANTS.DANGER);
                    setIsEndDateInvalid(true)
                    hasError = true
                }

                return hasError;
            };

            // validation
            let hasError = validateForm();
            if(hasError) {
                return;
            }

            // posting data to create trigger
            setIsLoading(true);
            let degree = Utils.celsiusToFahrenheit(temperature);

            try {
                await AlertService.createAlert(startDate, endDate, degree, cityInformation?.lat, cityInformation?.lon)

            } catch (error) {
                console.error("Error creating alert:", error);
                showToast(error.message, CONSTANTS.DANGER);
            } finally {
                setIsLoading(false);
            }

    }, [temperature, cityInformation, startDate, endDate, showToast]);


    return (
        <>
            <h1>Create an alert</h1>
            <span className="fst-italic"> The API required needs to be subscribed with credit card even though it is free. Thus, aborting of working on this module</span>

            <h3 className="mt-5"> 1. Select a city</h3>
            <SearchCity isParentLoading={isLoading} onCityChange={onCityChange}></SearchCity>
            <h3 className="mt-5"> 2. Enter information and submit</h3>
            <Form className={"row"} onSubmit={submit}>
                <Form.Group className="mb-3" controlId="cityFormGroup">
                    <Form.Label>City Name</Form.Label>
                    <Form.Control isInvalid={isCityInvalid} type="text" placeholder="" value={cityInformation?.name} disabled={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="latFormGroup">
                    <Form.Label>Lat</Form.Label>
                    <Form.Control isInvalid={isCityInvalid} type="text" placeholder="" value={cityInformation?.lat} disabled={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="longFormGroup">
                    <Form.Label>Long</Form.Label>
                    <Form.Control isInvalid={isCityInvalid} type="text" placeholder="" value={cityInformation?.lon} disabled={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="temperatureFormGroup">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control isInvalid={isTemperatureInvalid} type="number" placeholder="" onChange={temperatureChange} disabled={isLoading}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="startDateFormGroup">
                    <Form.Label>Start Datetime</Form.Label>
                    <Form.Control isInvalid={isStartDateInvalid} type="date" placeholder="" onChange={dateChange(setStartDate, setIsStartDateInvalid)} disabled={isLoading}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="endDateFormGroup">
                    <Form.Label>End Datetime</Form.Label>
                    <Form.Control isInvalid={isEndDateInvalid}  type="date" placeholder=""  onChange={dateChange(setEndDate, setIsEndDateInvalid)} disabled={isLoading}/>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    Submit
                </Button>
            </Form>
        </>
    )
}
export default CreateAlerts
