"use client";

import ProjectDialog from "@/components/ProjectDialog";
import { useProjectContext } from "@/context/ProjectContext";
import { Button } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";

function ProjectMenu() {
    const { projects, addProject, toggleProject, currentProject } =
        useProjectContext();

    const handleAddProject = () => {
        const id = uuidv4();
        addProject({ id, name: `Project ${projects.length + 1}` });
    };

    return (
        <div className="w-64 bg-zinc-900 p-4 border-r border-zinc-700 text-white h-screen">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Projects</h2>
                <Button
                    size="1"
                    onClick={handleAddProject}
                    color="gray"
                    variant="surface"
                >
                    +
                </Button>
            </div>
            <ul className="space-y-1">
                {projects.map((project) => (
                    <ProjectDialog
                        key={project.id}
                        project={project}
                        isActive={project.id === currentProject}
                        toggleProject={() => toggleProject(project.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ProjectMenu;
