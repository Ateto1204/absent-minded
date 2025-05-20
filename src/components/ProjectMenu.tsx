"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProjectDialog from "./dialogs/ProjectDialog";
import { useProjectContext } from "@/context/ProjectContext";
import { Button, Flex } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/app/lib/supabase";

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
            name: `Project ${projects.length + 1}`,
            user: userEmail,
            rootTask: "",
        });
    };

    const handleSignout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="relative w-64 bg-zinc-900 p-4 border-r border-zinc-700 text-white h-screen">
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
            <Flex
                direction="column"
                align="start"
                justify="between"
                className="absolute bottom-4 left-4 right-4 text-sm text-zinc-400 mb-2"
            >
                <Flex align="center" gap="3" className="mb-2">
                    {userAvatar ? (
                        <Image
                            src={userAvatar}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold">
                            {userName ? userName[0].toUpperCase() : "?"}
                        </div>
                    )}
                    <div>
                        <div>{userName}</div>
                        <div>{userEmail}</div>
                    </div>
                </Flex>
                {userEmail !== "" && (
                    <Button
                        size="1"
                        color="gray"
                        variant="soft"
                        onClick={handleSignout}
                    >
                        Sign out
                    </Button>
                )}
            </Flex>
        </div>
    );
}

export default ProjectMenu;
