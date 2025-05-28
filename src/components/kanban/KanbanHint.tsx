import { Text } from "@radix-ui/themes";

const KanbanHint = () => (
    <Text size="2" color="gray" align="center" className="mb-2">
        1.&nbsp;Tasks cannot be moved directly between{" "}
        <strong>Completed</strong> and <strong>Deprecated</strong>.&nbsp; Please
        move them to <strong>Active</strong> first. <br />
        2.&nbsp;Only tasks in <strong>Active</strong> status can be edited.
    </Text>
);

export default KanbanHint;
