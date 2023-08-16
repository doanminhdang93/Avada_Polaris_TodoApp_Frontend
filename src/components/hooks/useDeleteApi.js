import axiosClient from "../API/axiosClient";

const useDeleteApi = () => {
  const deleteTasksHandler = async (ids) => {
    try {
      await axiosClient.delete("/taskIds", {
        data: { ids },
      });
    } catch (error) {
      alert("An error has occurred while deleting tasks!");
      console.log(error);
    }
  };

  return { deleteTasksHandler };
};

export default useDeleteApi;
