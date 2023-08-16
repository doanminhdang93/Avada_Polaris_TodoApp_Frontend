import { useEffect, useState } from "react";
import axiosClient from "../API/axiosClient";

const useFetchApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [errors, setErrors] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resp = await axiosClient.get("/tasks");
      setFetched(true);
      setTaskList(resp.data.data);
    } catch (error) {
      setErrors(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading,
    taskList,
    errors,
    fetched,
    setIsLoading,
    setFetched,
    setErrors,
    setTaskList,
  };
};

export default useFetchApi;
