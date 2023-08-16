import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextContainer,
} from "@shopify/polaris";
const TaskItem = ({ task, onDelete, onUpdateTasksState, isLoading }) => {
  const { id, name, isCompleted } = task;
  const status = isCompleted ? "success" : "";
  const badgeTitle = isCompleted ? "Done" : "Pending";

  const updateTasksStateHandler = async () => {
    await onUpdateTasksState([id]);
  };

  const deleteHandler = async () => {
    await onDelete([id]);
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
