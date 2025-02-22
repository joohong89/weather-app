import { describe, it, expect, vi } from "vitest";
import {render, screen} from "@testing-library/react";
import Chart from "../../../../src/modules/dashboard/components/Chart.jsx";

const title = "Chart Component";
const description = "Chart component description";
const data = [{
    "dt": 1740128400,
    "rain": 0.63
},{
    "dt": 1740139200,
    "rain": 0.3
},{
    "dt": 1740150000,
    "rain": 0
}];

vi.mock('@mui/x-charts', () => ({
    BarChart: (props) => <div data-testid="bar-chart">{props.dataset && props.dataset.length}</div>,
    LineChart: (props) => <div data-testid="line-chart">{props.dataset && props.dataset.length}</div>
}));

describe('Chart Component', () => {
    it("should render title, data, and chart normally when all params provided", () => {


        render(<Chart title={title} description={description} dataset={data} dataKey={"rain"}/>);
        const head = screen.getByRole("heading");
        const desc= screen.getByText(description);
        const chart= screen.getByRole("chart");

        expect(head).toHaveTextContent(title);
        expect(desc).toBeInTheDocument();
        expect(chart).toBeInTheDocument();
    })

    it("should not render chart when dataset is empty", async () => {

        render(<Chart title={title} description={description} dataKey={"rain"}/>);
        const desc = screen.getByText(/no data found/i)

        expect(desc).toBeInTheDocument();
    });

    it("should not render chart when dataKey is empty", async () => {

        render(<Chart title={title} description={description} dataset={data}/>);
        const desc = screen.getByText(/no data found/i)

        expect(desc).toBeInTheDocument();
    });

    it("should render line chart when chartType is line", async () => {

        render(<Chart title={title} description={description} dataset={data} dataKey="rain" chartType="line" />);

        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
        expect(screen.queryByTestId("bar-chart")).not.toBeInTheDocument();
    });

    it("should render bar chart when chartType is bar", async () => {

        render(<Chart title={title} description={description} dataset={data} dataKey="rain" chartType="bar"/>);

        expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
        expect(screen.queryByTestId("line-chart")).not.toBeInTheDocument();

    });

    it("should render bar chart when chartType is not provided", async () => {

        render(<Chart title={title} description={description} dataset={data} dataKey="rain"/>);

        expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
        expect(screen.queryByTestId("line-chart")).not.toBeInTheDocument();

    });
})