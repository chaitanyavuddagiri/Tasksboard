import React, { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types/Task.type";
import { v4 as uuidv4 } from "uuid";

interface TaskContextProps {
	tasks: Task[];
	addTask: (task: Task) => void;
	updateTask: (index: string, updatedTask: Task) => void;
	deleteTask: (index: string) => void;
}

interface TaskProviderProps {
	children: React.ReactNode;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	// Function to load tasks from LocalStorage
	const loadTasks = () => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
		}
	};

	// Function to save tasks to LocalStorage
	const saveTasks = (tasks: Task[]) => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};

	useEffect(() => {
		loadTasks();
	}, []);

	useEffect(() => {
		saveTasks(tasks);
	}, [tasks]);

	const addTask = (task: Task) => {
		const taskWithId = { ...task, id: uuidv4() };
		setTasks([...tasks, taskWithId]);
	};

	const updateTask = (id: string, updatedTask: Task) => {
		setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
	};

	const deleteTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
			{children}
		</TaskContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
	const context = useContext(TaskContext);
	if (!context) throw new Error("useTasks must be used within TaskProvider");
	return context;
};
