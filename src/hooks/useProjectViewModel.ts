import { supabase } from "@/app/lib/supabase";
import Project from "@/models/entities/Project";
import ProjectViewModel from "@/models/entities/ProjectViewModel";
import ProjectService from "@/models/services/ProjectService";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "current-project-id";

const useProjectViewModel = (): ProjectViewModel => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState("");
    const [currentRoot, setCurrentRoot] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const getUserInfo = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                setEmail(data.user.email ?? "");
            }
        };
        getUserInfo();
    }, []);

    useEffect(() => {
        const loadProjects = async () => {
            const all = await ProjectService.getProjects(email);
            setProjects(all);
            setLoading(false);
            setSuccess(true);
        };
        loadProjects();
    }, [projects, email]);

    useEffect(() => {
        if (currentProject !== "") return;
        const storedProjectId = localStorage.getItem(STORAGE_KEY) as string;
        const initProject = projects.find((p) => p.id === storedProjectId);
        if (initProject) {
            setCurrentProject(initProject.id);
            setCurrentRoot(initProject.rootTask);
            return;
        }
        if (projects[0]) {
            setCurrentProject(projects[0].id);
            setCurrentRoot(projects[0].rootTask);
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

    const updateProjectName = async (id: string, name: string) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            const project = projects.find((p) => p.id === id);
            if (project) {
                const updated = { ...project, name };
                await ProjectService.updateProject(updated);
            }
            setProjects((prev) =>
                prev.map((project) =>
                    project.id === id ? { ...project, name } : project
                )
            );
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to update project");
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            await ProjectService.removeProject(id);
            setProjects((prev) => prev.filter((project) => project.id !== id));
            if (currentProject === id) {
                setCurrentProject("");
                localStorage.removeItem(STORAGE_KEY);
            }
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to delete project");
        } finally {
            setLoading(false);
        }
    };

    const toggleProject = (id: string) => {
        setCurrentProject(id);
        localStorage.setItem(STORAGE_KEY, id);
    };

    const setupRootTask = useCallback(
        (id: string) => {
            const project = projects.find((p) => p.id === currentProject);
            if (project) {
                const updated: Project = { ...project, rootTask: id };
                setProjects((prev) =>
                    prev.map((p) => (p.id === currentProject ? updated : p))
                );
                setCurrentRoot(id);
                ProjectService.updateProject(updated);
            }
        },
        [currentProject, projects]
    );

    return {
        projects,
        currentProject,
        currentRoot,
        toggleProject,
        addProject,
        updateProjectName,
        deleteProject,
        setupRootTask,
        loading,
        success,
        error,
    };
};

export default useProjectViewModel;
