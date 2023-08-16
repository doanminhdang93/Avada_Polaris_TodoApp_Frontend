import { Frame } from "@shopify/polaris";
import TopBarMarkup from "./TopBar";

const AppLayout = ({ children }) => {
  return <Frame topBar={<TopBarMarkup />}>{children}</Frame>;
};

export default AppLayout;
