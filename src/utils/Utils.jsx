import {DateTime} from "luxon";
import {CONSTANTS} from "../constants/Constants.js";

export const Utils = {
    formatLocation(city, state,country) {
        return <>
            {city &&`${city}` }  {city && state && `,` } {state} ({country})
        </>
    },
    formatStateAndCountry(state,country) {
        return <>
            {state && `${state},`} {country}
        </>
    },
    roundToOneDecimal(value) {
        return  value.toFixed(1);
    },
    formatTimeStamp(timeStamp) {
        if(!timeStamp) {
            return;
        }
        let dt = DateTime.fromMillis(timeStamp); // Assuming timestamp is in milliseconds\
        return dt.toFormat(CONSTANTS.DD_MM_YYYY_HH_MM_A);
    }
}