import React from 'react'
import SingleDayForecast from "./SingleDayForecast.jsx";
import {Col, Row} from "react-bootstrap";

const FiveDayForecast = ({weatherForecast}) => {
    return (
        <div className="fiveDayForecast">
            <h1 className="fw-bolder mb-3">5-Days Weather</h1>
            <Row className="">
                <Col className="mb-3" xs={12} md={6}>
                    <SingleDayForecast forecast={weatherForecast[0]}></SingleDayForecast>
                </Col>
                <Col xs={12} md={6} className="d-flex">
                    <Row>
                        {weatherForecast?.slice(1).map((forecast) =>
                            <Col key={forecast.dt} xs={6} className="mb-3" >
                                <SingleDayForecast  forecast={forecast}></SingleDayForecast>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>

        </div>
    )
}
export default FiveDayForecast
