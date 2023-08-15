import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import AppLayout from "./layout/AppLayout";
import TaskList from "./components/tasks/TaskList";

const App = () =>{
  return (
    <AppProvider>
      <AppLayout>
        <TaskList></TaskList>
      </AppLayout>
    </AppProvider>
  );
}

export default App;
