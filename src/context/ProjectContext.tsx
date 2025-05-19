"use client";

import useProjectViewModel from "@/hooks/useProjectViewModel";
import ProjectViewModel from "@/models/entities/ProjectViewModel";
import { createContext, useContext, ReactNode } from "react";

const ProjectContext = createContext<ProjectViewModel | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const projectViewModel = useProjectViewModel();
    return (
        <ProjectContext.Provider value={projectViewModel}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjectContext(): ProjectViewModel {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error(
            "useProjectContext must be used within a ProjectProvider"
        );
    }
    return context;
}
