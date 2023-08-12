import React, { useState } from "react";
import { Task as TaskType } from "../types/Task.type";
import {
	Card,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";

interface TaskProps {
	task: TaskType;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	// Add other props as needed
}

const TaskComponent: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
	const [showDetails, setShowDetails] = useState(false);
	const statusColors = {
		ToDo: "#f0f8ff",
		"In Progress": "#fafad2",
		Done: "#e6ffe6",
	};

	return (
		<Card
			style={{
				margin: "10px",
				backgroundColor: statusColors[task.status],
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
			onClick={() => setShowDetails(!showDetails)}
		>
			<CardContent>
				<Typography variant="h6">{task.name}</Typography>
				<Typography variant="caption">Deadline: {task.deadlines}</Typography>
				{showDetails && (
					<div>
						<Typography variant="body2">{task.description}</Typography>
						{/* Other details here */}
					</div>
				)}
			</CardContent>
			<CardActions>
				<IconButton onClick={() => onEdit(task.id)} data-testid="edit-icon">
					<EditIcon />
				</IconButton>
				<IconButton onClick={() => onDelete(task.id)} data-testid="delete-icon">
					<DeleteIcon />
				</IconButton>
				<IconButton>
					<CommentIcon />
					{/* Implement commenting logic */}
				</IconButton>
			</CardActions>
			{showDetails && (
				<Button onClick={() => setShowDetails(false)}>Hide Details</Button>
			)}
		</Card>
	);
};

export default TaskComponent;
