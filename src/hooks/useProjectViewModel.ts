import { useUserContext } from "@/context/UserContext";
import Project from "@/models/interfaces/project/Project";
import ProjectViewModel from "@/models/interfaces/viewModel/ProjectViewModel";
import ProjectService from "@/models/services/ProjectService";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "current-project-id";

const useProjectViewModel = (): ProjectViewModel => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { accessToken, serverUri } = useUserContext();

    useEffect(() => {
        const loadProjects = async () => {
            const all = await ProjectService.getProjectsByUserId(
                accessToken,
                serverUri
            );
            setProjects(all);
            setLoading(false);
            setSuccess(true);
        };
        if (accessToken) {
            loadProjects();
        }
    }, [accessToken, serverUri]);

    useEffect(() => {
        if (projects.length === 0) return;
        const storedProjectId = localStorage.getItem(STORAGE_KEY) as string;
        const initProject = projects.find((p) => p.id === storedProjectId);
        if (initProject) {
            setCurrentProject(initProject);
            return;
        }
        if (projects[0]) {
            setCurrentProject(projects[0]);
        }
    }, [projects, currentProject]);

    const addProject = async (project: Project) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            await ProjectService.addProject(project, accessToken, serverUri);
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
                await ProjectService.updateProject(
                    updated,
                    accessToken,
                    serverUri
                );
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
            await ProjectService.removeProject(id, accessToken, serverUri);
            setProjects((prev) => prev.filter((project) => project.id !== id));
            if (currentProject && currentProject.id === id) {
                setCurrentProject(null);
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

    const inviteParticipant = async (projectId: string, email: string) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            await ProjectService.inviteParticipant(
                projectId,
                email,
                accessToken,
                serverUri
            );
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === projectId
                        ? {
                              ...p,
                              participants: p.participants
                                  ? [...p.participants, email]
                                  : [email],
                          }
                        : p
                )
            );
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to invite participant");
        } finally {
            setLoading(false);
        }
    };

    const toggleProject = (id: string) => {
        const project = projects.find((p) => p.id === id);
        if (!project) return;
        setCurrentProject(project);
        localStorage.setItem(STORAGE_KEY, id);
    };

    const setupRootTask = useCallback(
        (id: string) => {
            if (!currentProject) return;
            const project = projects.find((p) => p.id === currentProject.id);
            if (project) {
                const updated: Project = { ...project, rootTask: id };
                setProjects((prev) =>
                    prev.map((p) => (p.id === currentProject.id ? updated : p))
                );
                ProjectService.updateProject(updated, accessToken, serverUri);
            }
        },
        [currentProject, projects, accessToken, serverUri]
    );

    return {
        projects,
        currentProject,
        toggleProject,
        addProject,
        updateProjectName,
        deleteProject,
        inviteParticipant,
        setupRootTask,
        loading,
        success,
        error,
    };
};

export default useProjectViewModel;
