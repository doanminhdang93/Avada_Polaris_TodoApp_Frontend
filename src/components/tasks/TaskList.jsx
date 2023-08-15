/* eslint-disable react-hooks/exhaustive-deps */
import { ResourceList, Page, Card, EmptyState } from "@shopify/polaris";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

const TaskList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false);

  const server = process.env.REACT_APP_API_URL;

  const toggleModal = () => {
    setActive(active => !active);
  };

  // @minhdang chuyển đoạn get data này thành hook nhé hook/useFetchApi
  // Dự án thật của mình có nhiều chỗ cần call api mỗi lần viết ntn thì bị phức tạp quá
  // Tham khảo code sample hoặc code a chỉ nhé. Em có thể tùy chỉnh sao cho có hook tối ưu, cover đc nhiều trường hợp sử dụng nhất có thể
  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${server}/tasks`);
      setTaskList(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  // @minhdang tương tự useFetchApi e có thể viết 1 cái hook useCreateApi cấn chỗ nào thì hỏi a
  const addNewTask = async taskName => {
    try {
      const { data } = await axios.post(`${server}/task`, {
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
  const deleteTasks = async ids => {
    try {
      await axios.delete(`${server}/taskIds`, {
        data: { ids },
      });
      setTaskList(curTask => curTask.filter(task => !ids.includes(task.id)));
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedItems([]);
    }
  };

  // @minhdang tương tự useUpdateApi
  const isCompletedTasks = async ids => {
    try {
      await axios.put(`${server}/taskIds`, {
        ids,
      });
      setTaskList(curTask =>
        curTask.map(task => {
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

  //link empty này có thể sử dụng lại nhiều nơi e cho vào /config nhé
  const emptyStateMarkup = (
    <EmptyState
      heading="No task found!"
      action={{ content: "Add new task!", onAction: toggleModal }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    ></EmptyState>
  );

  // @minhdang đoạn này tách ra thành component nhé
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
        renderItem={item => (
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
