import { Frame } from "@shopify/polaris";
import TopBarMarkup from "./TopBar";

// @minhdang những url như thế này https://i.imgur.com/kAuiktF.png e cho vào 1 file ntn nhé /src/config/theme.js
const AppLayout = ({ children }) => {
  const logo = {
    width: 124,
    topBarSource: "https://shopo.quomodothemes.website/assets/images/logo.svg",
    contextualSaveBarSource:
      "https://shopo.quomodothemes.website/assets/images/logo.svg",
    url: "#",
    accessibilityLabel: "Test",
  };

  return (
    <Frame topBar={<TopBarMarkup />} logo={logo}>
      {children}
    </Frame>
  );
};

export default AppLayout;
