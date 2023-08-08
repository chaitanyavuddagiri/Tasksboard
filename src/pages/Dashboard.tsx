import React from "react";
import TaskComponent from "../components/TaskComponent";
import { useTasks } from "../context/TaskContext";
import { Typography } from "@mui/material";

const Dashboard: React.FC = () => {
	const { tasks, deleteTask } = useTasks();

	const getStatusTasks = (status: "ToDo" | "In Progress" | "Done") =>
		tasks
			.filter((task) => task.status === status)
			.map((task) => (
				<TaskComponent
					key={task.id}
					task={task}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			));

	const handleEdit = (id: string) => {
		// Logic to edit task, possibly opening a dialog or navigating to an edit page
	};

	const handleDelete = (id: string) => {
		deleteTask(id);
	};

	return (
		<div>
			<Typography variant="h4">ToDo</Typography>
			{getStatusTasks("ToDo")}

			<Typography variant="h4">In Progress</Typography>
			{getStatusTasks("In Progress")}

			<Typography variant="h4">Done</Typography>
			{getStatusTasks("Done")}
		</div>
	);
};

export default Dashboard;
