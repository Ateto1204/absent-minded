import Flow from "@/components/flows/Flow";
import ProjectMenu from "@/components/projectMenu/ProjectMenu";
import { Flex } from "@radix-ui/themes";
import { memo } from "react";

const FlowView = () => {
    return (
        <main className="w-screen h-screen">
            <Flex>
                <ProjectMenu />
                <div className="flex-1 p-6">
                    <Flow />
                </div>
            </Flex>
        </main>
    );
};

export default memo(FlowView);
