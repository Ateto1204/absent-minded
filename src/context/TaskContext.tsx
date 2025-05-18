"use client";

import useTaskViewModel from "@/hooks/useTaskViewModel";
import TaskViewModel from "@/models/entities/TaskViewModel";
import { createContext, useContext, ReactNode } from "react";

const TaskContext = createContext<TaskViewModel | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
    const documentViewModel = useTaskViewModel();
    return (
        <TaskContext.Provider value={documentViewModel}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext(): TaskViewModel {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
}
