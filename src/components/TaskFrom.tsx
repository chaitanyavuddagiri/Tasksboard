import { Controller, useForm } from "react-hook-form";
import { Task } from "../types/Task.type";
import "./taskform.css";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useEffect } from "react";

interface TaskFormProps {
	open: boolean;
	task?: Task;
	onSave: (task: Task) => void;
	onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, task, onSave, onClose }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<Task>();

	useEffect(() => {
		console.log("from from control1 ==", task);
		if (task) {
			reset(task);
		} else {
			reset({
				name: "",
				description: "",
				deadlines: "",
				status: "ToDo",
			});
		}
	}, [task, reset]);

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSave)} className="formContainer">
					<Controller
						name="name"
						control={control}
						rules={{ required: "Name is required" }}
						render={({ field }) => (
							<TextField
								fullWidth
								label="Name"
								{...field}
								error={!!errors.name}
								helperText={errors.name?.message as string}
								variant="standard"
							/>
						)}
					/>
					<Controller
						name="description"
						control={control}
						rules={{ required: "Description is required" }}
						render={({ field }) => (
							<TextField
								fullWidth
								label="Description"
								multiline
								rows={4}
								{...field}
								error={!!errors.description}
								helperText={errors.description?.message as string}
								variant="standard"
							/>
						)}
					/>
					<Controller
						name="deadlines"
						control={control}
						rules={{ required: "Deadline is required" }}
						render={({ field }) => (
							<TextField
								fullWidth
								label="Deadlines"
								type="date"
								{...field}
								error={!!errors.deadlines}
								helperText={errors.deadlines?.message as string}
								InputLabelProps={{ shrink: true }}
								variant="standard"
							/>
						)}
					/>
					<FormControl fullWidth variant="standard">
						<InputLabel id="status-label">Status</InputLabel>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<Select labelId="status-label" {...field}>
									<MenuItem value="ToDo">To Do</MenuItem>
									<MenuItem value="In Progress">In Progress</MenuItem>
									<MenuItem value="Done">Done</MenuItem>
								</Select>
							)}
						/>
					</FormControl>
					<DialogActions
						sx={{
							display: "flex",
							flex: 1,
							gap: "10px",
							justifyContent: "flex-end",
							justifySelf: "flex-end",
						}}
					>
						<Button onClick={onClose}>Cancel</Button>
						<Button type="submit" variant={"contained"}>
							{task ? "Save" : "Add"}
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default TaskForm;
