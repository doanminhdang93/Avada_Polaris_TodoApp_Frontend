import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import { useState } from "react";

const TaskItem = ({ task, onDelete, onUpdateTasksState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id, name, isCompleted } = task;
  const status = isCompleted ? "success" : "";
  const badgeTitle = isCompleted ? "Done" : "Pending";

  const updateTasksStateHandler = async () => {
    setIsLoading(true);
    await onUpdateTasksState([id]);
    setIsLoading(false);
  };

  const deleteHandler = async () => {
    setIsLoading(true);
    await onDelete([id]);
    setIsLoading(false);
  };
  return (
    <ResourceItem
      persistActions
      id={id}
      accessibilityLabel={`View details for ${name}`}
    >
      <Stack distribution="equalSpacing">
        <TextContainer>{name}</TextContainer>
        <ButtonGroup>
          <Badge status={status}>{badgeTitle}</Badge>
          <Button onClick={updateTasksStateHandler} loading={isLoading}>
            {isCompleted ? "Not completed" : "Completed"}
          </Button>
          <Button destructive onClick={deleteHandler} loading={isLoading}>
            Delete
          </Button>
        </ButtonGroup>
      </Stack>
    </ResourceItem>
  );
};

export default TaskItem;
