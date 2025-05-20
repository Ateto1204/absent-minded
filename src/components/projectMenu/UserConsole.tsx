import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import SignoutDialog from "./SignoutDialog";

const UserConsole = ({
    avatar,
    name,
    email,
    handleSignout,
}: {
    avatar: string;
    name: string;
    email: string;
    handleSignout: () => void;
}) => {
    return (
        <Flex
            direction="column"
            align="start"
            justify="between"
            className="absolute bottom-4 left-4 right-4 text-sm text-zinc-400 mb-2"
        >
            <Flex align="center" gap="3" className="mb-2">
                {avatar ? (
                    <Image
                        src={avatar}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold">
                        {name ? name[0].toUpperCase() : "?"}
                    </div>
                )}
                <div>
                    <div>{name}</div>
                    <div>{email}</div>
                </div>
            </Flex>
            {email !== "" && <SignoutDialog handleSignout={handleSignout} />}
        </Flex>
    );
};

export default UserConsole;
