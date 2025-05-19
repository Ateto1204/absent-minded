"use client";

import { useProjectContext } from "@/context/ProjectContext";
import { Button } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";

function ProjectMenu() {
    const { projects, addProject, setCurrentProject, currentProject } =
        useProjectContext();

    const handleAddProject = () => {
        const id = uuidv4();
        addProject({ id, name: `Project ${projects.length + 1}` });
    };

    return (
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 text-black">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Projects</h2>
                <Button size="1" onClick={handleAddProject}>
                    +
                </Button>
            </div>
            <ul className="space-y-1">
                {projects.map((project) => {
                    const isActive = project.id === currentProject;
                    return (
                        <li
                            key={project.id}
                            className={`truncate px-2 py-1 rounded cursor-pointer ${
                                isActive
                                    ? "bg-blue-500 text-white font-semibold"
                                    : "hover:bg-gray-200 text-gray-800"
                            }`}
                            onClick={() => setCurrentProject(project.id)}
                        >
                            {project.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ProjectMenu;
