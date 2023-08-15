import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import AppLayout from "./layout/AppLayout";
import TaskList from "./components/tasks/TaskList";

//@minhdang trong AppProvider có prop theme . E tìm hiểu xem cách dùng ntn nhé
const App = () => {
  return (
    <AppProvider>
      <AppLayout>
        <TaskList></TaskList>
      </AppLayout>
    </AppProvider>
  );
};

export default App;
