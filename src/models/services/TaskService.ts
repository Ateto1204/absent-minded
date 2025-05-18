import Task from "@/models/entities/Task";

class TaskService {
    private static STORAGE_KEY = "tasks";

    private static delay<T>(result: T, ms = 1000): Promise<T> {
        return new Promise((resolve) => setTimeout(() => resolve(result), ms));
    }

    static async getTasks(): Promise<Task[]> {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        const tasks = raw ? (JSON.parse(raw) as Task[]) : [];
        return this.delay(tasks);
    }

    static async addTask(task: Task): Promise<void> {
        const tasks = await this.getTasks();
        tasks.push(task);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        return this.delay(undefined);
    }

    static async removeTasks(ids: string[]): Promise<void> {
        let tasks = await this.getTasks();
        tasks = tasks.filter((task) => !ids.includes(task.id));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        return this.delay(undefined);
    }

    static async updateTask(updatedTask: Task): Promise<void> {
        let tasks = await this.getTasks();
        tasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        return this.delay(undefined);
    }
}

export default TaskService;
