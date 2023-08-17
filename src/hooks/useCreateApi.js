import { useState } from "react";
import axiosClient from "../API/axiosClient";

const useCreateApi = () => {
  const [creating, setCreating] = useState(false);

  const createTask = async (data) => {
    try {
      setCreating(true);
      await axiosClient.post("/task", data);
    } catch (err) {
      alert("An error occurred while creating the new task!");
      console.log(err);
    } finally {
      setCreating(false);
    }
  };

  return { creating, createTask };
};

export default useCreateApi;
