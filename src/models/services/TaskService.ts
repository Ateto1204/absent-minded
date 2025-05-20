import Task from "@/models/entities/Task";

class TaskService {
    private static STORAGE_KEY = "tasks";

    private static delay<T>(result: T, ms = 1000): Promise<T> {
        return new Promise((resolve) => setTimeout(() => resolve(result), ms));
    }

    static getAllTasks(): Task[] {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        const allTasks = raw ? (JSON.parse(raw) as Task[]) : [];
        return allTasks;
    }

    static async getTasks(projectId: string): Promise<Task[]> {
        const allTasks = TaskService.getAllTasks();
        const tasks = allTasks.filter((task) => task.project === projectId);
        return this.delay(tasks);
    }

    static async addTasks(newTasks: Task[]): Promise<void> {
        const tasks = TaskService.getAllTasks();
        tasks.push(...newTasks);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        return this.delay(undefined);
    }

    static async removeTasks(ids: string[]): Promise<void> {
        let tasks = TaskService.getAllTasks();
        tasks = tasks.filter((task) => !ids.includes(task.id));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        return this.delay(undefined);
    }

    static async updateTask(updatedTask: Task): Promise<void> {
        let tasks = TaskService.getAllTasks();
        tasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        return this.delay(undefined);
    }
}

export default TaskService;
