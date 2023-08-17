import { useState } from "react";
import axiosClient from "../API/axiosClient";

const useUpdateSingleTask = () => {
  const [updatingSingleTask, setUpdatingSingleTask] = useState(false);
  const updateOneStatusHandler = async (id) => {
    try {
      setUpdatingSingleTask(true);
      await axiosClient.put(`/task/${id}`);
    } catch (err) {
      alert("An error has occurred while updating the status of the tasks");
      console.log(err);
    } finally {
      setUpdatingSingleTask(false);
    }
  };

  return { updatingSingleTask, updateOneStatusHandler };
};

export default useUpdateSingleTask;
