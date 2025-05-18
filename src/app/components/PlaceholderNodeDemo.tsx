import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { PlaceholderNode } from "@/components/placeholder-node";

// eslint-disable-next-line react/display-name
const PlaceholderNodeDemo = memo(({ selected }: NodeProps) => {
    return (
        <PlaceholderNode selected={selected}>
            <div>+</div>
        </PlaceholderNode>
    );
});

export default PlaceholderNodeDemo;
