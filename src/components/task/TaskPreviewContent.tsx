import TaskData from "@/models/entities/task/TaskData";
import { DataList, HoverCard } from "@radix-ui/themes";

const TaskPreviewContent = ({ id, data }: { id: string; data: TaskData }) => {
    return (
        <HoverCard.Content>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label>ID</DataList.Label>
                    <DataList.Value>{id}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>End at</DataList.Label>
                    <DataList.Value>
                        {data.deadline
                            ? new Date(data.deadline).toLocaleDateString(
                                  "en-US",
                                  {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  }
                              )
                            : "-"}
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Note</DataList.Label>
                    <DataList.Value>
                        {data.description === "" ? "-" : data.description}
                    </DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </HoverCard.Content>
    );
};

export default TaskPreviewContent;
