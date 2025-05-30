import TaskData from "@/models/interfaces/task/TaskData";
import { DataList, Flex, HoverCard, Text } from "@radix-ui/themes";

const TaskPreviewContent = ({ id, data }: { id: string; data: TaskData }) => {
    return (
        <HoverCard.Content>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label>ID</DataList.Label>
                    <DataList.Value>{id}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Duration</DataList.Label>
                    <DataList.Value>
                        <Flex gapX="2">
                            {data.start
                                ? new Date(data.start).toLocaleDateString(
                                      "en-US",
                                      {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      }
                                  )
                                : "-"}
                            <Text>~</Text>
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
                        </Flex>
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
