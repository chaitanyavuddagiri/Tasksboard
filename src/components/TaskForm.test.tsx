import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskForm from "./TaskForm";
import { Task } from "../types/Task.type";

const mockOnSave = jest.fn();
const mockOnClose = jest.fn();

const task: Task = {
	id: "task1",
	name: "Test Task",
	description: "This is a test task",
	deadlines: "2023-08-10",
	status: "ToDo",
	// Add other fields if needed
};

describe("TaskForm", () => {
	test("renders add task form if no task is provided", () => {
		render(<TaskForm open={true} onSave={mockOnSave} onClose={mockOnClose} />);
		expect(screen.getByText("Add Task")).toBeInTheDocument();
	});

	test("shows error message if required fields are missing", async () => {
		render(<TaskForm open={true} onSave={mockOnSave} onClose={mockOnClose} />);
		fireEvent.click(screen.getByTestId("submit-button"));
		expect(screen.getByText("Add Task")).toBeInTheDocument();
		expect(await screen.findByText("Name is required")).toBeInTheDocument();
		expect(
			await screen.findByText("Description is required")
		).toBeInTheDocument();
		expect(await screen.findByText("Deadline is required")).toBeInTheDocument();
	});

	test("renders edit task form if task is provided", async () => {
		render(
			<TaskForm
				open={true}
				task={task}
				onSave={mockOnSave}
				onClose={mockOnClose}
			/>
		);
		await waitFor(() => {
			expect(screen.getByText("Edit Task")).toBeInTheDocument();
			expect(screen.getByLabelText("Name").textContent).toBe(task.name);
			expect(screen.getByLabelText("Description").textContent).toBe(
				task.description
			);
			expect(screen.getByLabelText("Deadlines").textContent).toBe(
				task.deadlines
			);
		});
	});

	test("submits the form with the correct values", () => {
		render(<TaskForm open={true} onSave={mockOnSave} onClose={mockOnClose} />);
		fireEvent.change(screen.getByLabelText("Name"), {
			target: { value: task.name },
		});
		fireEvent.change(screen.getByLabelText("Description"), {
			target: { value: task.description },
		});
		fireEvent.change(screen.getByLabelText("Deadlines"), {
			target: { value: task.deadlines },
		});
		fireEvent.click(screen.getByTestId("submit-button"));
		expect(mockOnSave).toHaveBeenCalledWith(task);
	});

	test("calls onClose function when cancel button is clicked", () => {
		render(<TaskForm open={true} onSave={mockOnSave} onClose={mockOnClose} />);
		fireEvent.click(screen.getByText("Cancel"));
		expect(mockOnClose).toHaveBeenCalled();
	});
});
