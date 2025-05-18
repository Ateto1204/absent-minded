import Task from "@/models/Task";
import TaskViewModel from "@/models/TaskViewModel";
import { useState } from "react";

const useTaskViewModel = (): TaskViewModel => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return { tasks, addTask };
};

export default useTaskViewModel;
