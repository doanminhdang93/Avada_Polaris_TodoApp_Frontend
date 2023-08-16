import { Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

const TaskModal = ({ active, toggleModal, addNewTask }) => {
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (taskName) => {
    setTaskName(taskName);
  };

  const handleSubmit = async () => {
    try {
      if (!taskName.trim()) {
        throw new Error("You need to enter a valid task name!");
      }
      setLoading(true);
      await addNewTask(taskName);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
      setTaskName("");
    }
  };
  return (
    <Modal
      loading={loading}
      open={active}
      onClose={() => {
        setTaskName("");
        toggleModal();
      }}
      title="Create a new task"
      primaryAction={{
        content: "Create",
        onAction: handleSubmit,
        disabled: !taskName,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: toggleModal,
        },
      ]}
    >
      <Modal.Section>
        <TextField
          value={taskName}
          placeholder="Enter task name..."
          onChange={handleChange}
          error={message}
        />
      </Modal.Section>
    </Modal>
  );
};

export default TaskModal;
