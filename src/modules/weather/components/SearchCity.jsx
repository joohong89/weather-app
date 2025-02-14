import {Button, Col, FloatingLabel, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {IoMdSearch} from "react-icons/io";
import {GeocodeService} from "../../../services/GeocodeService.js";
import {useCallback, useEffect, useState} from "react";
import {Utils} from "../../../utils/Utils.jsx";
import {useToast} from "../../../context/ToastContext.jsx";
import {CONSTANTS} from "../../../constants/Constants.js";

const SearchCity = ({onCityChange, isParentLoading}) => {
    const showToast = useToast();
    const [cityIndex, setCityIndex] = useState(0);
    const [citySearchTerm, setCitySearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = () => setShowModal(false);
    const handleConfirm = () => {
        setShowModal(false);
        if(cityList && cityList.length > 0){
            onCityChange(cityList[cityIndex]);
        }
    }
    const handleShow = () => {
        setShowModal(true);
    }

    const validateCity = (city) => {

        const cityRegex = CONSTANTS.INPUT_REGEX;
        if(!city) {
            return { isValid: false, message: "City is required." };
        }

        if (!cityRegex.test(city)) {
            return { isValid: false, message: "Invalid characters in city name." };
        }

        return { isValid: true, message: "" };
    };

    const handleSubmit = useCallback(async () => {
            const validationResult = validateCity(citySearchTerm);
            setIsValid(validationResult.isValid);

            if (!validationResult.isValid) {
                setErrorMessage(validationResult.message);
                return
            }

            if(citySearchTerm.toLowerCase() === 'test') {
                showToast('API call with the value "test" always return error. Please try with another value', 'danger');
                return
            }

            try {
                setIsLoading(true)
                let results = await GeocodeService.getGeocode(citySearchTerm);
                setCityList(results);

                if(results && results.length === 1 ) {
                    onCityChange(results[0]);
                    showToast('City found', CONSTANTS.SUCCESS);
                    return
                }
                handleShow();
            } catch(error) {
                showToast(error.message, CONSTANTS.DANGER);
            } finally {
                setIsLoading(false);
            }
        }, [citySearchTerm, onCityChange, showToast]
    );


    const onCitySearch = (e) => {
        setCitySearchTerm(e.target.value);
    }

    const onCityUpdate = (e) => {
        setCityIndex(parseInt(e.target.value, 10));
    }

    useEffect(() => {
        setCityIndex(0);
    }, [citySearchTerm])


    return (
        <div className="search-city-wrapper">
            <Row className="justify-content-center">
                <Col className="p-0 me-3 search-city-search">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="City"
                    >

                        <Form.Control type="text"
                                      disabled={isLoading || isParentLoading}
                                      value={citySearchTerm}
                                      onChange={onCitySearch}
                                      placeholder="Enter City"
                                      isInvalid={isValid === false}
                                      isValid={isValid === true}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errorMessage}  {/* Display error message */}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                </Col>
                <Col xs="auto" className="p-0">
                    <Button className="search-city-button" type="submit" disabled={isLoading || isParentLoading} onClick={handleSubmit}><IoMdSearch /></Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCancel} className="search-city-search-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Select City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { cityList.length ?

                        <Form.Select aria-label="Refine Search" className="search-city-search-modal-input" value={cityIndex} onChange={onCityUpdate} >
                            {cityList.map((item, index) =>
                                <option key={index} value={index}>
                                    {Utils.formatLocation(item.name, item.state, item.country)}
                                </option>
                            )}
                        </Form.Select>
                        : <div>No cities found. Please try again</div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button className="text-decoration-none modal-close-button" variant="link" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default SearchCity
