import Project from "@/models/entities/Project";
import ProjectViewModel from "@/models/entities/ProjectViewModel";
import ProjectService from "@/models/services/ProjectService";
import { useEffect, useState } from "react";

const useProjectViewModel = (): ProjectViewModel => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            const all = await ProjectService.getProjects();
            setProjects(all);
        };
        loadProjects();
    }, [projects]);

    useEffect(() => {
        if (currentProject === "" && projects[0]) {
            setCurrentProject(projects[0]?.id || "");
        }
    }, [projects, currentProject]);

    const addProject = async (project: Project) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            await ProjectService.addProject(project);
            setProjects((prev) => [...prev, project]);
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to add project");
        } finally {
            setLoading(false);
        }
    };

    return {
        projects,
        currentProject,
        setCurrentProject,
        addProject,
        loading,
        success,
        error,
    };
};

export default useProjectViewModel;
