import { render, screen, fireEvent } from "../test-utils"; // Custom render
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
	test("renders the dashboard", () => {
		render(<Dashboard />);
		expect(screen.getByText("Tasks")).toBeInTheDocument();
	});

	test("adds a new task", async () => {
		render(<Dashboard />);
		fireEvent.click(screen.getByText("Add Task"));

		fireEvent.change(screen.getByLabelText("Name"), {
			target: { value: "Test Task" },
		});
		fireEvent.change(screen.getByLabelText("Description"), {
			target: { value: "Test Description" },
		});
		fireEvent.change(screen.getByLabelText("Deadlines"), {
			target: { value: new Date() },
		});

		const button = screen.getByTestId("submit-button");
		expect(button).toHaveTextContent("Add");
	});

	test("groups tasks by status", () => {
		render(<Dashboard />);
		// Verify tasks are grouped by status, e.g., 'ToDo', 'In Progress', 'Done'
		expect(screen.getByText("ToDo")).toBeInTheDocument();
		expect(screen.getByText("In Progress")).toBeInTheDocument();
		expect(screen.getByText("Done")).toBeInTheDocument();
	});
});
