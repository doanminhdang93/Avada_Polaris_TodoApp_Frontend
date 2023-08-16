import axiosClient from "../API/axiosClient";

const useUpdateStatus = () => {
  const updateStatusHandler = async (ids) => {
    try {
      await axiosClient.put("/taskIds", {
        ids,
      });
    } catch (err) {
      alert("An error has occurred while updating the status of the tasks");
      console.log(err);
    }
  };

  return { updateStatusHandler };
};

export default useUpdateStatus;
