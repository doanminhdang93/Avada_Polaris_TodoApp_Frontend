import { ResourceList, Page, Card } from "@shopify/polaris";
import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import EmptyStateMarkup from "../config/emptyState/EmptyStateMarkup";
import useFetchApi from "../hooks/useFetchApi";
import useCreateApi from "../hooks/useCreateApi";
import useDeleteApi from "../hooks/useDeleteApi";
import useUpdateStatus from "../hooks/useUpdateStatus";

const TaskList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { isLoading, taskList, setTaskList, setIsLoading } = useFetchApi();
  const [active, setActive] = useState(false);
  const toggleModal = () => {
    setActive((active) => !active);
  };

  const { createTask, creating } = useCreateApi();

  const addNewTask = async (data) => {
    await createTask(data);
    const newTask = {
      name: data.name,
      id: data.id,
      createdAt: data.createdAt,
    };
    const newTaskList = [{ ...newTask }, ...taskList];
    setTaskList(newTaskList);
    toggleModal();
  };

  const { deleteTasksHandler } = useDeleteApi();

  const deleteTasks = async (ids) => {
    setIsLoading(true);
    await deleteTasksHandler(ids);
    setTaskList((curTask) => curTask.filter((task) => !ids.includes(task.id)));
    setSelectedItems([]);
    setIsLoading(false);
  };

  const { updateStatusHandler } = useUpdateStatus();

  const isCompletedTasks = async (ids) => {
    setIsLoading(true);
    await updateStatusHandler(ids);
    setTaskList((curTask) =>
      curTask.map((task) => {
        if (!ids.includes(task.id)) return task;
        return { ...task, isCompleted: !task.isCompleted };
      })
    );
    setSelectedItems([]);
    setIsLoading(false);
  };

  const emptyStateMarkup = <EmptyStateMarkup toggleModal={toggleModal} />;

  const resourceListMarkup = (
    <Card>
      <ResourceList
        resourceName={{ singular: "task", plural: "tasks" }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        items={taskList}
        emptyState={emptyStateMarkup}
        loading={isLoading}
        renderItem={(item) => (
          <TaskItem
            task={item}
            onUpdateTasksState={isCompletedTasks}
            onDelete={deleteTasks}
            isLoading={isLoading}
          />
        )}
        promotedBulkActions={[
          {
            content: "Complete",
            onAction: () => isCompletedTasks(selectedItems),
          },
          {
            content: "Delete",
            onAction: () => deleteTasks(selectedItems),
          },
        ]}
      ></ResourceList>
    </Card>
  );

  const primaryAction = {
    content: "Create task",
    onAction: () => {
      toggleModal();
    },
  };
  return (
    <Page title="Tasks list" primaryAction={primaryAction}>
      {resourceListMarkup}
      <TaskModal
        addNewTask={addNewTask}
        active={active}
        toggleModal={toggleModal}
        creating={creating}
      />
    </Page>
  );
};

export default TaskList;
