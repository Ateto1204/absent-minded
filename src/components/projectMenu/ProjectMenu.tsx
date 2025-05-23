"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectDialog from "@/components/dialogs/ProjectDialog";
import { useProjectContext } from "@/context/ProjectContext";
import { Button, Flex, Tooltip } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/app/lib/supabase";
import UserConsole from "./UserConsole";

function ProjectMenu() {
    const { projects, addProject, toggleProject, currentProject } =
        useProjectContext();

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");

    const router = useRouter();

    useEffect(() => {
        const getUserInfo = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                setUserEmail(data.user.email ?? "");
                setUserName(data.user.user_metadata.full_name ?? "");
                const avatar =
                    data.user.user_metadata.avatar_url ??
                    data.user.user_metadata.picture ??
                    "";
                setUserAvatar(avatar);
            }
        };
        getUserInfo();
    }, []);

    const handleAddProject = () => {
        const id = uuidv4();
        addProject({
            id,
            name: "new project",
            user: userEmail,
            rootTask: "",
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
                            isActive={project.id === currentProject}
                            toggleProject={() => toggleProject(project.id)}
                        />
                    ))}
                </ul>
            </div>
            <UserConsole
                avatar={userAvatar}
                name={userName}
                email={userEmail}
                handleSignout={handleSignout}
            />
        </Flex>
    );
}

export default ProjectMenu;
