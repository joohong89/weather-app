import {DateTime} from "luxon";

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
        return dt.toFormat('dd-MM-yyyy hh:mma');
    }
}