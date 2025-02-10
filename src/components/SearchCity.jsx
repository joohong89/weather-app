import {Button, Col, FloatingLabel, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {IoMdSearch} from "react-icons/io";
import {GeocodeService} from "../services/GeocodeService.js";
import {useEffect, useState} from "react";
import {Utils} from "../Utils/Utils.jsx";

const SearchCity = ({onCityChange}) => {
    const [cityIndex, setCityIndex] = useState(0);
    const [citySearchTerm, setcitySearchTerm] = useState('');
    const [show, setShow] = useState(false);
    const [cityList, setCityList] = useState([]);


    const handleCancel = () => setShow(false);
    const handleConfirm = () => {
        setShow(false);
        if(cityList && cityList.length > 0){
            onCityChange(cityList[cityIndex]);
        }
    }
    const handleShow = () => {
        setShow(true);
    }

    const handleSubmit = async () => {
        let results = await GeocodeService.getGeocode(citySearchTerm);
        setCityList(results);

        if(results && results.length === 1 ) {
            onCityChange(results[0]);
            return
        }
        handleShow();
    }

    const onCitySearch = (e) => {
        setcitySearchTerm(e.target.value);
    }

    const onCityUpdate = (e) => {
        let id = parseInt(e.target.value, 10);
        setCityIndex(id);
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
                        <Form.Control type="text" value={citySearchTerm} onChange={onCitySearch} placeholder="Enter City" />
                    </FloatingLabel>
                </Col>
                <Col xs="auto" className="p-0">
                    <Button className="search-city-button" type="submit" onClick={handleSubmit}><IoMdSearch /></Button>
                </Col>
            </Row>

            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Select City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { cityList.length ?
                        <FloatingLabel
                            controlId="floatingSelect"
                            label="Country">
                            <Form.Select aria-label="Select a city" value={cityIndex} onChange={onCityUpdate} >
                                {cityList.map((item, index) =>
                                    <option key={index} value={index}>
                                        {Utils.formatLocation(item.name, item.state, item.country)}
                                    </option>
                                )}
                            </Form.Select>
                        </FloatingLabel> : <div>No city found. Please try again</div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button className="text-decoration-none" variant="link" onClick={handleCancel}>
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
