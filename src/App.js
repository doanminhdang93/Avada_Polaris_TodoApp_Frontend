import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import AppLayout from "./layout/AppLayout";
import TaskList from "./components/tasks/TaskList";
import { logo } from "./config/theme";

const App = () => {
  const theme = {
    logo: {
      width: 124,
      topBarSource: logo,
      contextualSaveBarSource: logo,
      url: "",
      accessibilityLabel: "Logo",
    },
  };

  return (
    <AppProvider theme={theme}>
      <AppLayout>
        <TaskList></TaskList>
      </AppLayout>
    </AppProvider>
  );
};

export default App;
