import { render, screen } from "../test-utils"; // Custom render
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
	test("renders the dashboard", () => {
		render(<Dashboard />);
		screen.debug();
		expect(screen.getByText("Tasks")).toBeInTheDocument();
	});

	// test("adds a new task", () => {
	// 	render(<Dashboard />);
	// 	fireEvent.click(screen.getByText("Add Task"));
	// 	// Fill in the form and save
	// 	// Assuming you have input fields with labels 'Name', 'Description', etc.
	// 	fireEvent.change(screen.getByLabelText("Name"), {
	// 		target: { value: "Test Task" },
	// 	});
	// 	// Repeat for other fields
	// 	fireEvent.click(screen.getByText("Save Task"));
	// 	expect(screen.getByText("Test Task")).toBeInTheDocument();
	// });

	// test("edits an existing task", () => {
	// 	// Assuming you have an existing task with the edit button
	// 	render(<Dashboard />);
	// 	fireEvent.click(screen.getByText("Edit")); // Click the edit button for a task
	// 	fireEvent.change(screen.getByLabelText("Name"), {
	// 		target: { value: "Updated Task" },
	// 	});
	// 	fireEvent.click(screen.getByText("Save Task"));
	// 	expect(screen.getByText("Updated Task")).toBeInTheDocument();
	// });

	// test("deletes a task", () => {
	// 	// Assuming you have an existing task with the delete button
	// 	render(<Dashboard />);
	// 	fireEvent.click(screen.getByText("Delete")); // Click the delete button for a task
	// 	fireEvent.click(screen.getByText("Delete")); // Confirm deletion
	// 	expect(screen.queryByText("Task to be deleted")).not.toBeInTheDocument();
	// });

	test("groups tasks by status", () => {
		render(<Dashboard />);
		// Verify tasks are grouped by status, e.g., 'ToDo', 'In Progress', 'Done'
		expect(screen.getByText("ToDo")).toBeInTheDocument();
		expect(screen.getByText("In Progress")).toBeInTheDocument();
		expect(screen.getByText("Done")).toBeInTheDocument();
	});
});
