import axiosClient from "../API/axiosClient";

const useCreateApi = () => {
  const createTask = async (name, id, createdAt) => {
    try {
      await axiosClient.post("/task", {
        name: name,
        id: id,
        createdAt: createdAt,
      });
    } catch (err) {
      alert("An error occurred while creating the new task!");
      console.log(err);
    }
  };

  return { createTask };
};

export default useCreateApi;
