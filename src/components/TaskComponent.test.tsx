import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskComponent from "./TaskComponent";
import { Task } from "../types/Task.type";

const task: Task = {
	id: "task1",
	name: "Test Task",
	status: "ToDo",
	deadlines: "2023-08-10",
	description: "This is a test task",
	// Add other fields as needed
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe("TaskComponent", () => {
	test("renders task with basic information", () => {
		render(
			<TaskComponent task={task} onEdit={mockOnEdit} onDelete={mockOnDelete} />
		);
		expect(screen.getByText(task.name)).toBeInTheDocument();
		expect(screen.getByText(`Deadline: ${task.deadlines}`)).toBeInTheDocument();
	});

	test("renders task with details", () => {
		render(
			<TaskComponent task={task} onEdit={mockOnEdit} onDelete={mockOnDelete} />
		);
		fireEvent.click(screen.getByText(task.name));
		expect(screen.getByText(task.description)).toBeInTheDocument();
	});

	test("edit task", () => {
		render(
			<TaskComponent task={task} onEdit={mockOnEdit} onDelete={mockOnDelete} />
		);
		fireEvent.click(screen.getByTestId("edit-icon"));
		expect(mockOnEdit).toHaveBeenCalledWith(task.id);
	});

	test("delete task", () => {
		render(
			<TaskComponent task={task} onEdit={mockOnEdit} onDelete={mockOnDelete} />
		);
		fireEvent.click(screen.getByTestId("delete-icon"));
		expect(mockOnDelete).toHaveBeenCalledWith(task.id);
	});

	test("toggle show details", () => {
		render(
			<TaskComponent task={task} onEdit={mockOnEdit} onDelete={mockOnDelete} />
		);
		fireEvent.click(screen.getByText(task.name));
		expect(screen.getByText(task.description)).toBeInTheDocument();
		fireEvent.click(screen.getByText("Hide Details"));
		expect(screen.queryByText(task.description)).not.toBeInTheDocument();
	});
});
