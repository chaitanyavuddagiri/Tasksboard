import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useTasks } from "../context/TaskContext";
import TaskComponent from "../components/TaskComponent";
import TaskForm from "../components/TaskFrom";
import { Task } from "../types/Task.type";
import "./dashboard.css";

const Dashboard: React.FC = () => {
	const { tasks, addTask, updateTask, deleteTask } = useTasks();
	const [openAddForm, setOpenAddForm] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | undefined>();
	const [openDeleteDialog, setOpenDeleteDialog] = useState<{
		open: boolean;
		id?: string;
	}>({ open: false });

	const handleAdd = (task: Task) => {
		addTask(task);
		setOpenAddForm(false);
	};

	const handleEdit = (id: string) => {
		const task = tasks.find((task) => task.id === id);
		setEditingTask(task);
		setIsEditFormOpen(true);
	};

	const handleEditSave = (task: Task) => {
		if (editingTask) {
			updateTask(editingTask.id, task);
		}
		setEditingTask(undefined);
		setIsEditFormOpen(false);
	};

	const handleDeleteConfirm = (id: string) => {
		deleteTask(id);
		setOpenDeleteDialog({ open: false });
	};

	const statuses = ["ToDo", "In Progress", "Done"];

	return (
		<div className="container">
			<div className="header">
				<Typography variant="h2">Tasks</Typography>
				<Button
					onClick={() => {
						setEditingTask(undefined);
						setOpenAddForm(true);
					}}
					variant={"contained"}
				>
					Add Task
				</Button>
			</div>
			<TaskForm
				key="add-task"
				open={openAddForm}
				onSave={handleAdd}
				onClose={() => setOpenAddForm(false)}
			/>
			<TaskForm
				key="edit-task"
				open={isEditFormOpen}
				task={editingTask}
				onSave={handleEditSave}
				onClose={() => setIsEditFormOpen(false)}
			/>
			<Dialog
				open={openDeleteDialog.open}
				onClose={() => setOpenDeleteDialog({ open: false })}
			>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					Are you sure you want to delete this task?
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteDialog({ open: false })}>
						Cancel
					</Button>
					<Button onClick={() => handleDeleteConfirm(openDeleteDialog.id!)}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<div className="taskContainer">
				{statuses.map((status, index) => (
					<div key={index} className="taskContainerColumn">
						<Typography variant="h6" sx={{ borderBottom: "1px solid black" }}>
							{status}
						</Typography>
						{tasks
							.filter((task) => task.status === status)
							.map((task) => (
								<TaskComponent
									key={task.id}
									task={task}
									onEdit={handleEdit}
									onDelete={(id) => setOpenDeleteDialog({ open: true, id })}
								/>
							))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
