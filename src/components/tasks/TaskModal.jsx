import { Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

const TaskModal = ({ active, toggleModal, addNewTask }) => {
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (taskName) => {
    setTaskName(taskName);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!taskName.trim()) {
        alert("You need to enter a task name!");
        throw new Error("Empty string error!");
      }
      await addNewTask(taskName);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTaskName("");
    }
  };

  return (
    <div>
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
          />
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default TaskModal;
