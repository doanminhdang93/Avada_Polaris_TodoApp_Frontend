import { useState } from "react";
import axiosClient from "../API/axiosClient";

const useDeleteApi = () => {
  const [deleting, setDeleting] = useState(false);
  const deleteTasksHandler = async (ids) => {
    setDeleting(true);
    try {
      await axiosClient.delete("/tasks", {
        data: { ids },
      });
    } catch (error) {
      alert("An error has occurred while deleting tasks!");
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, deleteTasksHandler };
};

export default useDeleteApi;
