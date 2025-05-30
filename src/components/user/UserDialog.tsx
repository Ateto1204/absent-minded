import {
    Avatar,
    Button,
    Dialog,
    Flex,
    Text,
    TextField,
} from "@radix-ui/themes";
import SignOutDialog from "@/components/dialogs/SignOutDialog";
import { LuUser } from "react-icons/lu";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import UserPlanBadge from "@/components/user/UserPlanBadge";
import PieChart from "@/components/PieChart";
import { useTaskContext } from "@/context/TaskContext";
import UserPlanHint from "@/components/user/UserPlanHint";

const UserDialog = ({ handleSignout }: { handleSignout: () => void }) => {
    const { userEmail, userName, userAvatar, userCreated } = useUserContext();
    const { serverUri, setServerUri } = useUserContext();
    const [uriState, setUriState] = useState(serverUri);
    const [saveStatus, setSaveStatus] = useState<"Save" | "Done">("Save");
    const { allTasks } = useTaskContext();

    const handleSave = (newUri: string) => {
        setTimeout(() => {
            setSaveStatus("Save");
        }, 500);
        setServerUri(newUri);
        setSaveStatus("Done");
    };

    return (
        <Dialog.Content>
            <Flex direction="column" justify="center" gap="3" className="py-3">
                <Dialog.Title>
                    <Flex justify="start" align="center" gap="3">
                        <Avatar
                            src={userAvatar}
                            size="4"
                            radius="full"
                            fallback={<LuUser />}
                        />
                        <Flex direction="column" gap="1" align="start">
                            <Flex align="center" gap="3">
                                <Text size="4" weight="bold">
                                    {userName}
                                </Text>
                                <UserPlanBadge />
                            </Flex>
                            <Text size="2" weight="regular">
                                {userEmail}
                            </Text>
                        </Flex>
                    </Flex>
                </Dialog.Title>
                <Text size="1" color="gray">
                    Create at:{" "}
                    {new Date(userCreated).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </Text>
                <Flex justify="between" align="center" className="pb-5">
                    <Flex align="center" gap="2">
                        <UserPlanHint />
                        <Text size="2" className="w-fit">
                            Server URI :{" "}
                        </Text>
                    </Flex>
                    <TextField.Root
                        value={uriState}
                        onChange={(e) => setUriState(e.target.value)}
                        placeholder="enter your server uri"
                        className="w-2/3"
                    ></TextField.Root>
                    <Button size="2" onClick={() => handleSave(uriState)}>
                        {saveStatus}
                    </Button>
                </Flex>
                <Flex
                    justify="center"
                    my="5"
                    direction="column"
                    align="center"
                    gap="4"
                >
                    <Text size="3" weight="bold" className="mb-2 text-zinc-100">
                        Pie Chart of All Task Status
                    </Text>
                    <PieChart tasks={allTasks} />
                </Flex>
                <Dialog.Description>
                    <SignOutDialog handleSignout={handleSignout} />
                </Dialog.Description>
            </Flex>
        </Dialog.Content>
    );
};

export default UserDialog;
