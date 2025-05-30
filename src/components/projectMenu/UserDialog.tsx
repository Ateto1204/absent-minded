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
import UserConsoleProps from "@/components/projectMenu/UserConsoleProps";
import UserPlanBadge from "@/components/projectMenu/UserPlanBadge";

const UserDialog = ({
    avatar,
    name,
    email,
    handleSignout,
}: UserConsoleProps) => {
    const { serverUri, setServerUri } = useUserContext();
    const [uriState, setUriState] = useState(serverUri);
    const [saveStatus, setSaveStatus] = useState<"Save" | "Done">("Save");

    const handleSave = (newUri: string) => {
        setTimeout(() => {
            setSaveStatus("Save");
        }, 500);
        setServerUri(newUri);
        setSaveStatus("Done");
    };
    return (
        <Dialog.Content>
            <Flex direction="column" justify="center" gap="4" className="py-3">
                <Dialog.Title>
                    <Flex justify="start" align="center" gap="3">
                        <Avatar
                            src={avatar}
                            size="4"
                            radius="full"
                            fallback={<LuUser />}
                        />
                        <Flex direction="column" gap="1" align="start">
                            <Flex align="center" gap="2">
                                <Text size="4" weight="bold">
                                    {name}
                                </Text>
                                <UserPlanBadge />
                            </Flex>
                            <Text size="2" weight="regular">
                                {email}
                            </Text>
                        </Flex>
                    </Flex>
                </Dialog.Title>
                <Flex justify="between" align="center" className="pb-5">
                    <Text size="2" className="w-fit">
                        Server URI :{" "}
                    </Text>
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
                <SignOutDialog handleSignout={handleSignout} />
            </Flex>
        </Dialog.Content>
    );
};

export default UserDialog;
