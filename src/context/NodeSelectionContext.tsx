"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface NodeSelectionContextType {
    selectedNode: string | null;
    selectNode: (id: string | null) => void;
}

const NodeSelectionContext = createContext<NodeSelectionContextType>({
    selectedNode: null,
    selectNode: () => {},
});

export const NodeSelectionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    const selectNode = (id: string | null) => {
        setSelectedNode(id);
    };

    useEffect(() => {
        const handleGlobalNodeSelection = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { id } = customEvent.detail;
            selectNode(id);
        };

        window.addEventListener(
            "global-node-select",
            handleGlobalNodeSelection
        );

        return () => {
            window.removeEventListener(
                "global-node-select",
                handleGlobalNodeSelection
            );
        };
    }, []);

    return (
        <NodeSelectionContext.Provider
            value={{
                selectedNode,
                selectNode,
            }}
        >
            {children}
        </NodeSelectionContext.Provider>
    );
};

export const useNodeSelection = () => useContext(NodeSelectionContext);
