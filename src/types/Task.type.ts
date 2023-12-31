export type Status = "ToDo" | "In Progress" | "Done";

export interface Task {
	id: string;
	name: string;
	description: string;
	deadlines: string;
	status: Status;
}
