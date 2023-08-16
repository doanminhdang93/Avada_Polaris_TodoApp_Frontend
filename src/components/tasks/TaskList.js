/* eslint-disable react-hooks/exhaustive-deps */
import { ResourceList, Page, Card } from "@shopify/polaris";
import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import EmptyStateMarkup from "../config/EmptyStateMarkup";
import useFetchApi from "../hooks/useFetchApi";
import tasksApi from "../API/tasksApi";
import useCreateApi from "../hooks/useCreateApi";

const TaskList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { isLoading, taskList, setTaskList } = useFetchApi();

  const [active, setActive] = useState(false);

  const toggleModal = () => {
    setActive((active) => !active);
  };

  // @minhdang tương tự useFetchApi e có thể viết 1 cái hook useCreateApi cấn chỗ nào thì hỏi a
  const addNewTask = async (taskName) => {
    try {
      const { data } = await tasksApi.create({
        name: taskName,
      });
      const newTasks = [{ ...data.data }, ...taskList];
      setTaskList(newTasks);
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  // @minhdang tương tự useDeleteApi
  const deleteTasks = async (ids) => {
    try {
      await tasksApi.delete({
        data: { ids },
      });
      setTaskList((curTask) =>
        curTask.filter((task) => !ids.includes(task.id))
      );
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedItems([]);
    }
  };

  // @minhdang tương tự useUpdateApi
  const isCompletedTasks = async (ids) => {
    try {
      await tasksApi.updateStatus({
        ids,
      });
      setTaskList((curTask) =>
        curTask.map((task) => {
          if (!ids.includes(task.id)) return task;
          return { ...task, isCompleted: !task.isCompleted };
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedItems([]);
    }
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
