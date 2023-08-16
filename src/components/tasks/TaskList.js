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
  const { isLoading, taskList, setTaskList } = useFetchApi();
  const [active, setActive] = useState(false);
  const toggleModal = () => {
    setActive((active) => !active);
  };

  const { createTask } = useCreateApi();

  const addNewTask = ({ name, id, createdAt }) => {
    createTask(name, id, createdAt);
    const newTask = {
      name: name,
      id: id,
      createdAt: createdAt,
    };
    const newTaskList = [{ ...newTask }, ...taskList];
    setTaskList(newTaskList);
    toggleModal();
  };

  const { deleteTasksHandler } = useDeleteApi();

  const deleteTasks = (ids) => {
    deleteTasksHandler(ids);
    setTaskList((curTask) => curTask.filter((task) => !ids.includes(task.id)));
    setSelectedItems([]);
  };

  const { updateStatusHandler } = useUpdateStatus();

  const isCompletedTasks = (ids) => {
    updateStatusHandler(ids);
    setTaskList((curTask) =>
      curTask.map((task) => {
        if (!ids.includes(task.id)) return task;
        return { ...task, isCompleted: !task.isCompleted };
      })
    );
    setSelectedItems([]);
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
      />
    </Page>
  );
};

export default TaskList;
