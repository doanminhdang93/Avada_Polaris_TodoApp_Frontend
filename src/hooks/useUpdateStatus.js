import { useState } from "react";
import axiosClient from "../API/axiosClient";

const useUpdateStatus = () => {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const updateStatusHandler = async (ids) => {
    try {
      setUpdatingStatus(true);
      await axiosClient.put("/tasks", {
        ids,
      });
    } catch (err) {
      alert("An error has occurred while updating the status of the tasks");
      console.log(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  return { updatingStatus, updateStatusHandler };
};

export default useUpdateStatus;
