import { describe, it, expect, vi } from "vitest";
import {render, screen} from "@testing-library/react";
import CreateAlerts from "../../../../src/modules/alerts/Views/CreateAlerts.jsx";
import {userEvent} from "@testing-library/user-event";

// Mock `useToast` to return a mock function for showToast
vi.mock('../../../../src/context/ToastContext.jsx', () => ({
    useToast: vi.fn(() => vi.fn()), // returns mock function when useToast is called
}));

vi.mock('../../../../src/modules/weather/components/SearchCity.jsx', () => ({
    __esModule: true, // Ensure this is a module
    default: ({ onCityChange }) => {
        return (
            <button onClick={() => onCityChange({ name: 'Test City', lat: 1.23, lon: 4.56 })}>
                Simulate City Change
            </button>
        );
    }
}));


describe('Alert View', () => {
    it("should mark fields as invalid when there is no input and button has been pressed",async () => {
        render(<CreateAlerts />);

        const user = userEvent.setup();
        const button = screen.getByRole("button", { name: "Submit" });
        const cityName = screen.getByLabelText(/city name/i);
        const lat = screen.getByLabelText(/lat/i);
        const lon = screen.getByLabelText(/long/i);
        const temperature = screen.getByLabelText(/temperature/i);
        const startDate = screen.getByLabelText(/Start datetime/i);
        const endDate = screen.getByLabelText(/end datetime/i);
        await user.click(button);

        expect(cityName).toHaveClass("is-invalid");
        expect(lat).toHaveClass("is-invalid");
        expect(lon).toHaveClass("is-invalid");
        expect(temperature).toHaveClass("is-invalid");
        expect(startDate).toHaveClass("is-invalid");
        expect(endDate).toHaveClass("is-invalid");

    });
    it("should populate City Name, Lat , Long after city has been searched",async () => {
        render(<CreateAlerts />);

        const user = userEvent.setup();
        const button = screen.getByRole("button", { name: /simulate city change/i });
        const submit = screen.getByRole("button", { name: "Submit" });
        await user.click(button);
        await user.click(submit);

        const cityName = screen.getByLabelText(/city name/i);
        const lat = screen.getByLabelText(/lat/i);
        const lon = screen.getByLabelText(/long/i);


        expect(cityName).not.toHaveClass("is-invalid");
        expect(cityName).toHaveValue("Test City");
        expect(lat).not.toHaveClass("is-invalid");
        expect(lat).toHaveValue("1.23");
        expect(lon).not.toHaveClass("is-invalid");
        expect(lon).toHaveValue("4.56");
    });

    it("should highlight fields(temp, startDate, endDate) that have error",async () => {
        render(<CreateAlerts />);

        const user = userEvent.setup();
        const submit = screen.getByRole("button", { name: "Submit" });

        const temperature = screen.getByLabelText(/temperature/i);
        await user.type(temperature, 'T');
        const startDate = screen.getByLabelText(/Start datetime/i);
        await user.type(startDate, 'x');
        const endDate = screen.getByLabelText(/end datetime/i);
        await user.type(endDate, 'x');
        await user.click(submit);

        expect(temperature).toHaveClass("is-invalid");
        expect(startDate).toHaveClass("is-invalid");
        expect(endDate).toHaveClass("is-invalid");

    });

    it("should not highlight fields (temp, startDate, endDate) that have no error",async () => {
        render(<CreateAlerts />);

        const user = userEvent.setup();
        const submit = screen.getByRole("button", { name: "Submit" });

        const temperature = screen.getByLabelText(/temperature/i);
        await user.type(temperature, "10");
        const startDate = screen.getByLabelText(/Start datetime/i);
        await user.type(startDate, '2025-01-01');
        const endDate = screen.getByLabelText(/end datetime/i);
        await user.type(endDate, '2025-02-03');
        await user.click(submit);

        expect(temperature).not.toHaveClass("is-invalid");
        expect(startDate).not.toHaveClass("is-invalid");
        expect(endDate).not.toHaveClass("is-invalid");
    });

    it("should highlight endDate if it is earlier than start date",async () => {
        render(<CreateAlerts />);

        const user = userEvent.setup();
        const submit = screen.getByRole("button", { name: "Submit" });
        const startDate = screen.getByLabelText(/Start datetime/i);
        await user.type(startDate, '2025-02-01');
        const endDate = screen.getByLabelText(/end datetime/i);
        await user.type(endDate, '2025-01-28');
        await user.click(submit);


        expect(startDate).not.toHaveClass("is-invalid");
        expect(endDate).toHaveClass("is-invalid");

    });

})