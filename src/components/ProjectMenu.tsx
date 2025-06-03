"use client";

import { useRouter } from "next/navigation";
import ProjectDialog from "@/components/dialogs/ProjectDialog";
import { useProjectContext } from "@/context/ProjectContext";
import { Button, Flex, Tooltip } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import UserConsole from "@/components/user/UserConsole";
import { useUserContext } from "@/context/UserContext";

function ProjectMenu() {
    const { projects, addProject, toggleProject, currentProject, loading } =
        useProjectContext();
    const { userEmail } = useUserContext();

    const router = useRouter();

    const handleAddProject = () => {
        if (!currentProject) return;
        const id = uuidv4();
        addProject({
            id,
            name: "new project",
            ownerId: userEmail,
            rootTask: "",
            participants: currentProject.participants,
        });
    };

    const handleSignout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <Flex
            direction="column"
            className="relative w-64 bg-zinc-900 p-4 border-r border-zinc-700 text-white h-screen pb-36"
        >
            <Flex justify="between" align="center" mb="4">
                <h2 className="text-lg font-semibold text-white">Projects</h2>
                <Tooltip content="Add project">
                    <Button
                        disabled={loading}
                        size="1"
                        onClick={handleAddProject}
                        color="gray"
                        variant="surface"
                    >
                        +
                    </Button>
                </Tooltip>
            </Flex>
            <div className="overflow-y-auto flex-1">
                <ul className="space-y-1">
                    {projects.map((project) => (
                        <ProjectDialog
                            key={project.id}
                            project={project}
                            isActive={project.id === currentProject?.id}
                            toggleProject={() => toggleProject(project.id)}
                        />
                    ))}
                </ul>
            </div>
            <UserConsole handleSignout={handleSignout} />
        </Flex>
    );
}

export default ProjectMenu;
