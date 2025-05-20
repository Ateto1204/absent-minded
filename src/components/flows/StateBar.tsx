import { Flex, Spinner, Text } from "@radix-ui/themes";
import { useProjectContext } from "@/context/ProjectContext";
import { useTaskContext } from "@/context/TaskContext";
import React, { useEffect, useState } from "react";

const StateBar = () => {
    const {
        loading: taskLoading,
        success: taskSuccess,
        error: taskError,
    } = useTaskContext();
    const {
        loading: projectLoading,
        success: projectSuccess,
        error: projectError,
    } = useProjectContext();
    const [isActive, setIsActive] = useState(false);

    const isLoading = taskLoading || projectLoading;
    const isError = taskError || projectError;
    const isSuccess = taskSuccess && projectSuccess;

    useEffect(() => {
        if (!isLoading && (isError || isSuccess)) {
            setIsActive(true);
            setTimeout(() => {
                setIsActive(false);
            }, 1000);
        }
    }, [isLoading, isError, isSuccess]);

    return isLoading ? (
        <Flex
            gapX="1"
            className="absolute bottom-3 right-3 p-2 bg-white rounded text-gray-700"
        >
            <Spinner size="1" className="relative top-0.5" />
            <Text size="1">Loading</Text>
        </Flex>
    ) : (
        isActive && (
            <Text
                size="1"
                className={`absolute bottom-3 right-3 p-2 rounded text-black ${
                    isError ? "bg-red-300" : "bg-white"
                }`}
            >
                done
            </Text>
        )
    );
};

export default StateBar;
