import {BarChart} from "@mui/x-charts/BarChart";
import {CONSTANTS} from "../../../constants/Constants.js";
import {LineChart} from "@mui/x-charts";

const CHART_COMPONENTS = {
    bar: BarChart,
    line: LineChart
};

const Chart = ({chartSetting, dataset, dataKey, label, description, title, valueFormatter, chartType}) => {

    const ChartComponent = CHART_COMPONENTS[chartType] || BarChart;

    return (
        <div className="weather-card">
            <h3 className="fw-bolder">{title}</h3>
            <span>{description}</span>

                <ChartComponent
                    className="m-auto w-100 mt-3"
                    dataset={dataset}
                    series={[
                        { dataKey: dataKey, label: label, stack: 'stack1', color: CONSTANTS.CHART_COLOR },
                    ]}
                    xAxis={[{  scaleType: 'band', dataKey: 'dt',
                        valueFormatter: valueFormatter}]}
                    {...chartSetting}
                />

        </div>)
}
export default Chart
