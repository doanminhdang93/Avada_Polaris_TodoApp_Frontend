import tasksApi from "../API/tasksApi";
import { useEffect, useState } from "react";

const useCreateApi = (taskName) => {
  const [newTask, setNewTask] = useState({});

  const createTask = async () => {
    try {
      const { resp } = await tasksApi.create({
        name: taskName,
      });
      // const newTask = resp?.data;
      setNewTask(resp?.data);
    } catch (err) {
      alert("An error occurred while creating the new task!");
      console.log(err);
    } finally {
      setNewTask({});
    }
  };
  useEffect(() => {
    createTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskName]);

  return newTask ? newTask : {};
};

export default useCreateApi;
