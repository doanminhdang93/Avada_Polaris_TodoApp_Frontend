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
  const { id, name, isCompleted } = task;
  const status = isCompleted ? "success" : "";
  const badgeTitle = isCompleted ? "Done" : "Pending";
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updateTasksStateHandler = async () => {
    setUpdatingStatus(true);
    await onUpdateTasksState([id]);
    setUpdatingStatus(false);
  };

  const deleteHandler = async () => {
    setDeleting(true);
    await onDelete([id]);
    setDeleting(false);
  };
  return (
    <ResourceItem id={id} accessibilityLabel={`View details for ${name}`}>
      <Stack distribution="equalSpacing">
        <TextContainer>{name}</TextContainer>
        <ButtonGroup>
          <Badge status={status}>{badgeTitle}</Badge>
          <Button onClick={updateTasksStateHandler} loading={updatingStatus}>
            {isCompleted ? "Not completed" : "Completed"}
          </Button>
          <Button destructive onClick={deleteHandler} loading={deleting}>
            Delete
          </Button>
        </ButtonGroup>
      </Stack>
    </ResourceItem>
  );
};

export default TaskItem;
